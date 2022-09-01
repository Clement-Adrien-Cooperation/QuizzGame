import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { verify } from 'jsonwebtoken';

export const checkUser = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, decoded: any) => {
    
    if(!err && decoded) {
      try {
        const prisma = new PrismaClient();
        await prisma.$connect();

        // get user from database
        const user: any = await prisma.user.findUnique({
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

        await prisma.$disconnect();

      } catch (error){
        res.status(404).json(error);
      };
    } else {
      res.status(401).json({message: "Vous n'êtes pas authentifié"});
    };
  });
};