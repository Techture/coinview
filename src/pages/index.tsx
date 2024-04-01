import React, { useMemo } from 'react';
import Layout from '../components/Layout';
import CoinContainer from '../components/CoinContainer';
import CryptoMenu from '../components/CryptoMenu';
import WelcomeHero from '../components/WelcomeHero';
import VideoComponent from '../components/VideoHero';
import { GetServerSideProps } from 'next';
import { CoinData } from '@/types';

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
    // Use environment variable for API endpoint if applicable
    const apiEndpoint = process.env.API_ENDPOINT; // Ensure to configure this in your .env.local file
    const apiKey = process.env.CMC_API_KEY;

    const res = await fetch(`${apiEndpoint}/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,LTC`, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey as string,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch coins, status: ${res.status}`);
    }

    const rawData = await res.json();
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
        num_market_pairs: rawCoin.num_market_pairs.toLocaleString('en-US') || '0',
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

    // Format the most recent update date
    const formattedMostRecentUpdate = new Date(mostRecentTimestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York',
    });

    return {
      props: {
        coinsData,
        mostRecentUpdate: formattedMostRecentUpdate,
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
