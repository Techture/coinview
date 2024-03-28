import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const symbols = 'BTC,ETH,LTC'; // Define the symbols you want to fetch
  const apiKey = process.env.CMC_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'API key is not available' });
    return;
  }

  try {
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      }
      // Removed 'params' because fetch does not support 'params'. You have to include query parameters in the URL string.
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Since you're fetching specific coins, filter them out of the response if necessary or send the whole data object.
    res.status(200).json(data.data); // This will contain the information for BTC, ETH, and LTC
  } catch (error: unknown) { // Unknown is a safer type than any
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      // Handle the case where the error is not an Error instance
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}  
