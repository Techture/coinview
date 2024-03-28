export interface CoinQuote {
  price: number;
  market_cap: number;
  volume_24h: number;
  percent_change_24h: number;
}

export interface CoinData {
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
