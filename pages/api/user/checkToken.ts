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

      const prisma = new PrismaClient();

      await prisma.$connect();

      try {
        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id
          }
        });

        console.log(decoded);
        
        res.status(200).json(user);
        
      } catch (error){
        res.status(404).json(error);
      };
  
      await prisma.$disconnect();

    } else {
      res.status(401).json({message: "Le token est expiré"});
    };
  });
};