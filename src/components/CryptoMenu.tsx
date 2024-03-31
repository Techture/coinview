import React, { RefObject } from 'react';
import Image from 'next/image';
import useCoinData from '../hooks/useCoinData';
import { useLastUpdated } from '../../context/LastUpdatedContext';

interface CryptoMenuProps {
  bitcoinRef: RefObject<HTMLDivElement>;
  ethereumRef: RefObject<HTMLDivElement>;
  litecoinRef: RefObject<HTMLDivElement>;
}

const CryptoMenu: React.FC<CryptoMenuProps> = ({ bitcoinRef, ethereumRef, litecoinRef }) => {
  const { coins } = useCoinData();
  const { lastUpdatedString } = useLastUpdated();

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

  return (
    <div className="crypto-menu">
      <div className="flex flex-row items-center mt-1">
        {cryptoRefs.map((crypto) => {
          const coin = coins[crypto.symbol];
          return (
            <div key={crypto.symbol}>
              <div
                onClick={() => scrollToRef(crypto.ref)}
                className="svg-drop-shadow cursor-pointer ml-10 mr-10 transition-transform duration-300 hover:scale-110"
              >
                <Image
                  src={`/logos/${crypto.symbol.toLowerCase()}-logo.svg`}
                  alt={crypto.name}
                  width={crypto.symbol === 'ETH' ? 44 : 70}
                  height={crypto.symbol === 'ETH' ? 44 : 70}
                />
              </div>
              <div className="flex mt-3 items-center justify-center">
                {coin && <p>{coin.quote.USD.price ? `${coin.quote.USD.price}` : 'Loading...'}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <p className="property text-sm md:text-l text-center">
          Updated: {lastUpdatedString || 'Loading...'}
        </p>
      </div>
    </div>
  );
};

export default CryptoMenu;
