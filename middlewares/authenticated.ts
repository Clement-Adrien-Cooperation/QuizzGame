import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, decoded: any) => {
    if(!err && decoded) {
      return await fn(req, res);
    } else {
      res.status(401).json({message: "Vous n'êtes pas authentifié"});
    };
  });
};