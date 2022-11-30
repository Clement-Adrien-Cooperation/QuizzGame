import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import db from '../lib/prisma';

export const checkUser = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, decoded: any) => {

    if(!err && decoded) {
      try {
        // get user from database
        const user: any = await db.user.findUnique({
          where: {
            id: decoded.id
          }
        });

        // if user still exist
        if(user) {
          // verify if user is admin
          if(user.is_admin === true) {

            // we return original API call
            return await fn(req, res);

          // If user is banished
          } else if(user.is_banished === true) {

            res.status(403).json({message: "Vous avez été banni"});

          // & if this is the right user
          } else if(user.id !== req.body.user_id) {

            res.status(401).json({message: "L'ID de l'utilisateur ne correspond pas"});

          } else {
            // if everything is ok, we return the original API call
            return await fn(req, res);
          };
        } else {
          res.status(404).json({message: "Utilisateur inexistant"});
        };
      } catch (error){
        res.status(404).json(error);
      };
    } else {
      res.status(401).json({message: "Vous n'êtes pas authentifié"});
    };
  });
};