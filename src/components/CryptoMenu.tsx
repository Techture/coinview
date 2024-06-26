import React, { RefObject, useState, useEffect } from 'react';
import Image from 'next/image';
import { CoinData } from '@/types';

interface CryptoMenuProps {
  bitcoinRef: RefObject<HTMLDivElement>;
  ethereumRef: RefObject<HTMLDivElement>;
  litecoinRef: RefObject<HTMLDivElement>;
  coinsData: Record<string, CoinData>;
}

const CryptoMenu: React.FC<CryptoMenuProps & { mostRecentUpdate: string }> = ({
  coinsData,
  mostRecentUpdate,
  bitcoinRef,
  ethereumRef,
  litecoinRef,
}) => {
  const [localMostRecentUpdate, setLocalMostRecentUpdate] = useState('');
  console.log('mostRecentUpdate', mostRecentUpdate);
  console.log('coinsData', coinsData);

  const cryptoRefs = [
    { ref: bitcoinRef, symbol: 'BTC', name: 'Bitcoin' },
    { ref: ethereumRef, symbol: 'ETH', name: 'Ethereum' },
    { ref: litecoinRef, symbol: 'LTC', name: 'Litecoin' },
  ];

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Convert the mostRecentUpdate string back to a Date object
    const updateDate = new Date(mostRecentUpdate);

    // Format it using the browser's local timezone
    const formattedDate = updateDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setLocalMostRecentUpdate(formattedDate);
  }, [mostRecentUpdate]);

  return (
    <div className="crypto-menu">
      <div className="flex flex-row items-center mt-1">
        {cryptoRefs.map((crypto) => {
          const coin = coinsData[crypto.symbol];
          return (
            <div key={crypto.symbol}>
              <div
                onClick={() => scrollToRef(crypto.ref)}
                className="svg-drop-shadow cursor-pointer ml-10 mr-10 transition-transform duration-300 hover:scale-110"
              >
                <Image
                  src={`/logos/${crypto.symbol.toLowerCase()}-logo.svg`}
                  alt={crypto.name}
                  width={70}
                  height={70}
                />
              </div>
              <div className="flex mt-2 items-center justify-center">
                {coin && (
                  <p>
                    {coin.quote.USD.price
                      ? `$${Number(coin.quote.USD.price).toLocaleString('en-US')}`
                      : 'Loading...'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <p className="property text-sm md:text-l text-center">
          Updated: {localMostRecentUpdate || 'Loading...'}
        </p>
      </div>
    </div>
  );
};

export default CryptoMenu;
