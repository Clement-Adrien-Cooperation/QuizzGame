import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { verify } from 'jsonwebtoken';

export const isAdmin = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, decoded: any) => {

    if(!err && decoded) {
      try {

        const prisma = new PrismaClient();
        await prisma.$connect();

        const user: any = await prisma.user.findUnique({
          where: {
            id: decoded.id
          }
        });

        if(user) {
          
          if(user.is_admin === true) {
            return await fn(req, res);
          } else {
            res.status(403).json({message: "Vous n'êtes pas administrateur"});
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