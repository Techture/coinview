import React, { useEffect, useState, RefObject } from 'react';
import CoinDetails from './CoinDetails';
import ScrollToTopButton from './ScrollTopTopButton';

interface CoinContainerProps {
  bitcoinRef: RefObject<HTMLDivElement>;
  ethereumRef: RefObject<HTMLDivElement>;
  litecoinRef: RefObject<HTMLDivElement>;
}

const CoinContainer: React.FC<CoinContainerProps> = ({ bitcoinRef, ethereumRef, litecoinRef }) => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<Record<string, any>>({});
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const fetchCoins = async () => {
    try {
      const response = await fetch('/api/coins');
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollToTop && window.pageYOffset > 400) {
        setShowScrollToTop(true);
      } else if (showScrollToTop && window.pageYOffset <= 400) {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    fetchCoins();

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScrollToTop]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const headerImageMapping: { [key: string]: { left: string; right: string } } = {
    Bitcoin: {
      left: '/images/coin-container/bitcoin-left.jpg',
      right: '/images/coin-container/bitcoin-right.jpg',
    },
    Ethereum: {
      left: '/images/coin-container/ethereum-left.jpg',
      right: '/images/coin-container/ethereum-right.jpg',
    },
    Litecoin: {
      left: '/images/coin-container/litecoin-left.jpg',
      right: '/images/coin-container/litecoin-right.jpg',
    },
  };

  const imageMapping: { [key: string]: string } = {
    Bitcoin: 'bitcoin.jpg',
    Ethereum: 'ethereum.jpg',
    Litecoin: 'litecoin.jpg',
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {Object.entries(coins).map(([symbol, coin], index) => {
          let ref;
          if (coin.name === 'Bitcoin') ref = bitcoinRef;
          if (coin.name === 'Ethereum') ref = ethereumRef;
          if (coin.name === 'Litecoin') ref = litecoinRef;

          const imageUrl = `/images/${imageMapping[coin.name] || 'bitcoin.jpg'}`;

          const headerImages = headerImageMapping[coin.name] || {
            left: 'coin-container/bitcoin-left.jpg',
            right: 'coin-container/bitcoin-right.jpg',
          };
          const headerImageUrlLeft = headerImages.left;
          const headerImageUrlRight = headerImages.right;

          return (
            <div
              key={index}
              className="fullpage-section"
              ref={ref}
              style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
            >
              <CoinDetails
                symbol={symbol}
                coin={coin}
                headerImageUrlLeft={headerImageUrlLeft}
                headerImageUrlRight={headerImageUrlRight}
              />
            </div>
          );
        })}
      </div>
      {showScrollToTop && (
        <ScrollToTopButton showScrollToTop={showScrollToTop} scrollToTop={scrollToTop} />
      )}
    </>
  );
};

export default CoinContainer;
