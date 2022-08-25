import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.update({
      where: {
        pseudo: req.body.currentPseudo
      },
      data: {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password
      }
    });

    res.status(200).json(user);
    
  } catch (error){
    console.log(error);
  };
  
  prisma.$disconnect();
};