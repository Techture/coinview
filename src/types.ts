import { RefObject } from 'react';

export interface CoinQuote {
  price: number;
  market_cap: number;
  volume_24h: number;
  percent_change_24h: number;
}

export interface CoinData {
  ref?: RefObject<HTMLDivElement>;
  name: string;
  symbol: string;
  num_market_pairs: number;
  last_updated: number;
  quote: {
    USD: CoinQuote;
  };
}

export interface CoinDetailsProps {
  symbol: string;
  coin: CoinData;
  headerImageUrlLeft: string;
  headerImageUrlRight: string;
}

export interface CoinMarketCapApiResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      slug: string;
      num_market_pairs: number;
      date_added: string;
      tags: string[];
      max_supply: number | null;
      circulating_supply: number;
      total_supply: number;
      platform: null | {
        id: number;
        name: string;
        symbol: string;
        slug: string;
        token_address: string;
      };
      cmc_rank: number;
      last_updated: string;
      quote: {
        USD: {
          price: number;
          volume_24h: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
          market_cap: number;
          last_updated: string;
        };
      };
    };
  };
}
