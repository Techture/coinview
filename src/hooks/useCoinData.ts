import { useState, useEffect } from 'react';
import { CoinData } from '@/types';
import { useLastUpdated } from '../../context/LastUpdatedContext';

const useCoinData = () => {
  const [coins, setCoins] = useState<Record<string, CoinData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { setLastUpdatedString } = useLastUpdated();

  const fetchCoins = async () => {
    try {
      const response = await fetch('/api/coins');
      const rawData = await response.json();
      const data: Record<string, CoinData> = {};
      let mostRecentTimestamp = 0;
      let mostRecentUpdate = ''; // This will hold the most recent date string for formatting

      for (const key in rawData) {
        const rawCoin = rawData[key];
        const timestamp = new Date(rawCoin.last_updated).getTime();

        if (!isNaN(timestamp) && timestamp > mostRecentTimestamp) {
          mostRecentTimestamp = timestamp;
          mostRecentUpdate = rawCoin.last_updated; // Update with the latest valid date string
        }

        data[key] = {
          name: rawCoin.name || 'Unknown',
          symbol: rawCoin.symbol,
          num_market_pairs: rawCoin.num_market_pairs.toLocaleString('en-US') || 0,
          last_updated: rawCoin.last_updated,
          quote: {
            USD: {
              price: rawCoin.quote.USD.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }),
              market_cap: rawCoin.quote.USD.market_cap.toLocaleString('en-US'),
              volume_24h: rawCoin.quote.USD.volume_24h.toLocaleString('en-US'),
              percent_change_24h: rawCoin.quote.USD.percent_change_24h.toLocaleString('en-US'),
            },
          },
        };
      }

      if (mostRecentUpdate) {
        const lastUpdatedDate = new Date(mostRecentUpdate);
        const formattedDate = lastUpdatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setLastUpdatedString(formattedDate);
      } else {
        setLastUpdatedString('No update information available.');
      }

      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
      setLastUpdatedString('Failed to load data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return { coins, loading };
};

export default useCoinData;
