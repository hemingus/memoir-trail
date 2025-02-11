import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("OpenAI API Key from process.env:", process.env.OPENAI_API_KEY); // Log the API key
  
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing API Key as usual" });
    }
  
    res.status(200).json({ success: true, message: "API Key loaded!" });
  }