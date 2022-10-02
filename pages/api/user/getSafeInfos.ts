import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();

  try {
    const user = await prisma.user.findUnique({
      where: {
        pseudo: req.body.pseudo
      }
    });
    
    res.status(200).json({
      id: user?.id,
      pseudo: user?.pseudo,
      is_banished: user?.is_banished
    });
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
};