import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const url = "https://poloniex.com/public?command=returnTicker";
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    return response.status(200).json(data);
  } catch (error) {
    console.error("fetch failed", error);

    // return a 500 Internal Server Error if something goes wrong
    return response.status(500).json({ error: "Failed to fetch data" });
  }
}
