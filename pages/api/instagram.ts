import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  thumbnail_url: string,
  author_name: string,
  provider_name: string,
  provider_url: string
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | {error: string}>) {
    if (req.method === 'POST') {
      const { url } = JSON.parse(req.body);
      if (url && process.env.FB_ACCESS_KEY) {
        return fetch(`https://graph.facebook.com/v14.0/instagram_oembed?fields=thumbnail_url%2Cauthor_name%2Cprovider_name%2Cprovider_url&access_token=${process.env.FB_ACCESS_KEY}&url=${url}`)
          .then(response => response.json())
          .then(response => res.status(200).json(response))
          .catch(() => res.status(400).json({error: "Something went wrong"}))
      } else {
        return res.status(500).json({error: "missing data"})
      }
    }
  }
  