import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  if(req.body.pseudoOrEmail.includes('@') && req.body.pseudoOrEmail.includes('.')) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.pseudoOrEmail
        }
      });
      res.status(200).json(user);
      
    }
    catch (error){
      console.log(error);
    };

  } else {
    try {
      const user = await prisma.user.findUnique({
        where: {
          pseudo: req.body.pseudoOrEmail
        }
      });
      res.status(200).json(user);
      
    }
    catch (error){
      console.log(error);
    };
  };
  
  prisma.$disconnect();
};