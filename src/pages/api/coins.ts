import { CoinMarketCapApiResponse } from '@/types';

async function fetchCoins(symbols: string, apiKey: string): Promise<CoinMarketCapApiResponse> {
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as CoinMarketCapApiResponse;
    console.log('data: ', data);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to fetch from CoinMarketCap:', error.message);
      throw new Error(error.message);
    } else {
      console.error('An unexpected error occurred', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export default fetchCoins;
