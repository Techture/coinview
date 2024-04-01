import React, { useMemo } from 'react';
import Layout from '../components/Layout';
import CoinContainer from '../components/CoinContainer';
import CryptoMenu from '../components/CryptoMenu';
import WelcomeHero from '../components/WelcomeHero';
import VideoComponent from '../components/VideoHero';
import { GetServerSideProps } from 'next';
import { CoinData } from '@/types';
import fetchCoinData from './api/coins';

type HomeProps = {
  coinsData: Record<string, CoinData> | null;
  error?: string;
  mostRecentUpdate: string;
};

const Home: React.FC<HomeProps> = ({ coinsData, mostRecentUpdate }) => {
  // Using useMemo to ensure refs are constant across re-renders
  const refs = useMemo(
    () => ({
      bitcoinRef: React.createRef<HTMLDivElement>(),
      ethereumRef: React.createRef<HTMLDivElement>(),
      litecoinRef: React.createRef<HTMLDivElement>(),
    }),
    []
  );

  return (
    <Layout>
      <div className="fullpage-section relative flex justify-center items-center">
        <VideoComponent />
        <div className="welcome-hero z-10 flex flex-col justify-center items-center">
          <WelcomeHero />
          {coinsData && (
            <CryptoMenu coinsData={coinsData} mostRecentUpdate={mostRecentUpdate} {...refs} />
          )}
        </div>
      </div>
      {coinsData && <CoinContainer coinsData={coinsData} {...refs} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apiKey = process.env.CMC_API_KEY || '';
    const apiEndpoint = process.env.API_ENDPOINT || '';

    const rawData = await fetchCoinData(apiEndpoint, apiKey);

    const coinsData: Record<string, CoinData> = {};
    let mostRecentTimestamp = 0;
    let mostRecentUpdate = '';

    for (const key in rawData.data) {
      const rawCoin = rawData.data[key];
      const timestamp = new Date(rawCoin.last_updated).getTime();

      if (!isNaN(timestamp) && timestamp > mostRecentTimestamp) {
        mostRecentTimestamp = timestamp;
        mostRecentUpdate = rawCoin.last_updated;
      }

      coinsData[key] = {
        name: rawCoin.name || 'Unknown',
        symbol: rawCoin.symbol,
        num_market_pairs: rawCoin.num_market_pairs || 0,
        last_updated: rawCoin.last_updated,
        quote: {
          USD: {
            price: rawCoin.quote.USD.price,
            market_cap: rawCoin.quote.USD.market_cap,
            volume_24h: rawCoin.quote.USD.volume_24h,
            percent_change_24h: rawCoin.quote.USD.percent_change_24h,
          },
        },
      };
    }

    const isoString = new Date(mostRecentTimestamp).toISOString();

    return {
      props: {
        coinsData,
        mostRecentUpdate: isoString,
      },
    };
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    return {
      props: {
        coinsData: null,
        error: 'Failed to fetch data',
      },
    };
  }
};

export default Home;
