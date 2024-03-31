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
