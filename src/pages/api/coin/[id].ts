import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // 'id' corresponds to the coin ID or symbol

  const apiKey = process.env.CMC_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'API key is not available' });
    return;
  }

  // Check if the requested id is one of the specified symbols
const symbols = ['BTC', 'ETH', 'LTC'];
const requestedSymbol = (id as string).toString().toUpperCase();

if (!symbols.includes(requestedSymbol)) {
    res.status(400).json({ error: 'Requested symbol is not supported.' });
    return;
}

  try {
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${requestedSymbol}`, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Ensure that the requested symbol is in the response data
    if (data.data && data.data[requestedSymbol]) {
      res.status(200).json(data.data[requestedSymbol]);
    } else {
      throw new Error('Symbol not found in the response data');
    }
  } catch (error: unknown) { // Unknown is a safer type than any
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      // Handle the case where the error is not an Error instance
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}  