import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, decoded: any) => {

    if(!err && decoded) {
      try {
        const user = await db.user.findUnique({
          where: {
            id: decoded.id
          }
        });

        if(user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({message: 'Utilisateur inexistant'});
        };
      } catch (error){
        res.status(404).json(error);
      };
    } else {
      res.status(401).json({message: "Le token est expiré"});
    };
  });
};