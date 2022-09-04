import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json(categories);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
};