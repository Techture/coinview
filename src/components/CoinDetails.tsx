import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CoinDetailsProps } from '@/types';
import Image from 'next/image';

// call this only on client side
const GSAPScroller = dynamic(() => import('./GSAPScroller'), {
  ssr: false,
}) as React.ComponentType<any>;

const CoinDetails: React.FC<
  CoinDetailsProps & { headerImageUrlLeft: string; headerImageUrlRight: string }
> = ({ symbol, coin, headerImageUrlLeft, headerImageUrlRight }) => {
  const logoPath = `/logos/${symbol.toLowerCase()}-logo.svg`;

  const coinRef = useRef<HTMLDivElement>(null);

  const getCoinHistory = (name: string) => {
    const histories: { [key: string]: string[] } = {
      Bitcoin: [
        'Bitcoin was the first cryptocurrency to successfully record transactions on a secure, decentralized blockchain-based network.',
        'The first commercial transaction using Bitcoin was by Laszlo Hanyecz who famously spent 10,000 Bitcoin for two pizzas in 2010.',
        'As of the time of writing, Bitcoin\'s maximum supply is capped at 21 million coins, and "mining" them becomes increasingly difficult as more are produced.',
      ],
      Ethereum: [
        'Ethereum introduced the concept of "smart contracts" which are programs that run on the blockchain and can execute automatically when certain conditions are met.',
        "The Ethereum network's native token, Ether, is used to compensate participant nodes for computations performed.",
        'Ethereum plans to reduce energy consumption by 99% by moving from a proof-of-work to a proof-of-stake consensus mechanism, known as Ethereum 2.0.',
      ],
      Litecoin: [
        "Litecoin was created with the intent to improve upon Bitcoin's technology, offering faster transaction times and lower fees.",
        'There will only ever be 84 million Litecoins, exactly four times the number of Bitcoin units.',
        'Litecoin was the first of the top 5 cryptocurrencies by market cap to adopt Segregated Witness, a method of increasing the number of transactions that fit into a block.',
      ],
    };

    return histories[name] || ['No history available for this coin.'];
  };

  // State to store the last updated string
  const [lastUpdatedString, setLastUpdatedString] = useState('');

  console.log('coin', coin);

  useEffect(() => {
    if (coin.last_updated) {
      const lastUpdatedDate = new Date(coin.last_updated);
      const formattedDate = lastUpdatedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short',
      });
      setLastUpdatedString(formattedDate);
    }
  }, [coin.last_updated]);

  return (
    <GSAPScroller coinRef={coinRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-stretch md:mx-10 my-5 backdrop-filter backdrop-blur-sm md:p-6 sm:p-0">
        {/* Left Column */}
        <div className="flex flex-col w-full mb-0 md:mb-0 p-6 flex-grow md:min-h-[30vh] bg-gradient-rtl rounded-xl shadow-lg">
          <div
            className="left-header flex justify-center md:justify-start items-center logo-anim relative rounded"
            style={{ backgroundImage: `url(${headerImageUrlLeft})`, backgroundSize: 'cover' }}
          >
            {/* Overlay  */}
            <div className="header-overlay absolute inset-0 bg-white opacity-50 z-10 rounded"></div>

            <Image
              src={logoPath}
              alt={`${coin.name}`}
              className="svg-drop-shadow h-20 w-20 p-2 logo z-20"
              width={80}
              height={80}
            />
            <h3 className="coin-detail-header z-20">
              {coin.name} ({symbol})
            </h3>
          </div>
          <ul className="mt-7 coin-properties">
            <li className="property text-xl  flex justify-between">
              <span>Price:</span>
              <span>${coin.quote.USD.price.toLocaleString()}</span>
            </li>
            <li className="property text-xl  flex justify-between">
              <span>Market Cap:</span>
              <span>${coin.quote.USD.market_cap.toLocaleString()}</span>
            </li>
            <li className="property text-xl  flex justify-between">
              <span>24h Volume:</span>
              <span>${coin.quote.USD.volume_24h.toLocaleString()}</span>
            </li>
            <li className="property text-xl  flex justify-between">
              <span>24h Change:</span>
              <span>{coin.quote.USD.percent_change_24h.toFixed(2)}%</span>
            </li>
            <li className="property text-xl flex justify-between">
              <span>Market Pairs:</span>
              <span>{coin.num_market_pairs}</span>
            </li>
          </ul>
          <p className="property md:text-xl text-center">
            Last updated: {lastUpdatedString || 'Loading...'}
          </p>
        </div>

        {/* Right Column */}
        <div className="p-6 flex-grow bg-gradient-ltr rounded-xl shadow-lg backdrop-filter backdrop-blur-sm">
          <div
            className="right-header flex justify-center md:justify-start items-center rounded p-4 relative"
            style={{
              backgroundImage: `url(${headerImageUrlRight})`,
              backgroundSize: 'cover',
            }}
          >
            {/* Overlay  */}
            <div className="header-overlay absolute inset-0 bg-white opacity-50 z-10 rounded"></div>
            <h3 className="coin-detail-header z-20">Fun Facts</h3>
          </div>
          <ul className="list-disc list-inside space-y-2 coin-facts">
            {getCoinHistory(coin.name).map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </GSAPScroller>
  );
};

export default CoinDetails;
