import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export const checkUser = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, decoded: any) => {
    console.log(decoded);
    
    if(!err && decoded) {
      if(decoded.is_admin === true) {

        return await fn(req, res);

      } else if(decoded.is_banished === true) {

        res.status(403).json({message: "Vous avez été banni"});

      } else if(decoded.id !== req.body.user_id) {

        res.status(403).json({message: "L'ID de l'utilisateur ne correspond pas"});
      
      } else {
        return await fn(req, res);
      };
    } else {
      res.status(401).json({message: "Vous n'êtes pas authentifié"});
    };
  });
};