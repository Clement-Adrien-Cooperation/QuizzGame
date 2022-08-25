import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany({
      where: {
        is_banished: true
      },
      orderBy: [{
        id: 'asc'
      }]
    });
    res.status(200).json(users);
    
  } catch (error){
    console.log(error);
  };
  
  prisma.$disconnect();
};