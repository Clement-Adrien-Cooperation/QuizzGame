import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { verify } from 'jsonwebtoken';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const secret: any = process.env.JWT_SECRET;

  verify(req.headers.authorization!, secret, async(err: any, decoded: any) => {

    if(!err && decoded) {
      try {
        const prisma = new PrismaClient();
        await prisma.$connect();

        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id
          }
        });

        if(user) {
          if(user.is_banished === true) {
            res.status(401).json({message: "Vous avez été banni"});
          } else {
            res.status(200).json(user);
          };
        } else {
          res.status(404).json({message: 'Utilisateur inexistant'});
        };

        await prisma.$disconnect();

      } catch (error){
        res.status(404).json(error);
      };
    } else {
      res.status(401).json({message: "Le token est expiré"});
    };
  });
};