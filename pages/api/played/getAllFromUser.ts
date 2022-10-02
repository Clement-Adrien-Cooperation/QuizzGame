import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const played = await prisma.played.findMany({
      where: {
        user_id: req.body.user_id
      }
    });
    
    res.status(200).json(played);
    
  } catch (error){
    
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
};