import { CoinMarketCapApiResponse } from '@/types';

async function fetchCoinData(
  apiEndpoint: string,
  apiKey: string
): Promise<CoinMarketCapApiResponse> {
  const response = await fetch(
    `${apiEndpoint}/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,LTC`,
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

  const data: CoinMarketCapApiResponse = await response.json();
  return data;
}

export default fetchCoinData;
