import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export const checkUser = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, user: any) => {
    
    if(!err && user) {
      if(user.is_admin === true) {

        return await fn(req, res);

      } else if(user.is_banished === true) {

        res.status(403).json({message: "Vous avez été banni"});

      } else if(user.id !== req.body.user_id || user.id !== req.body.id) {

        res.status(404).json({message: "L'ID de l'utilisateur ne correspond pas"});
      
      } else {
        return await fn(req, res);
      };
    } else {
      res.status(401).json({message: "Vous n'êtes pas authentifié"});
    };
  });
};