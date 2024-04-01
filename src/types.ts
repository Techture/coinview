import { RefObject } from 'react';

export interface CoinQuote {
  price: number;
  market_cap: number;
  volume_24h: number;
  percent_change_24h: number;
}

// This interface reflects the structure of coin data
// from the API, plus an optional 'ref' for UI-related scrolling functionality
export interface CoinData {
  ref?: RefObject<HTMLDivElement>; // Made optional and should be used only in component logic
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
      max_supply: number | null; // updated to allow null if max supply is unknown
      circulating_supply: number;
      total_supply: number;
      platform: null | {
        // updated with a more specific structure
        id: number;
        name: string;
        symbol: string;
        slug: string;
        token_address: string;
      };
      cmc_rank: number;
      last_updated: string; // this matches the format "2024-04-01T16:22:00.000Z" as per your image
      quote: {
        USD: {
          price: number;
          volume_24h: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
          market_cap: number;
          last_updated: string; // same as above
        };
      };
    };
  };
}
