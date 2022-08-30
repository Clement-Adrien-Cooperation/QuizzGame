import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function getAllUsers (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();

  try {
    const users = await prisma.user.findMany({
      where: {
        is_banished: false
      },
      orderBy: [{
        pseudo: 'asc'
      }]
    });
    res.status(200).json(users);
    
  } catch (error){
    res.status(404).json(error);
  
  };

  await prisma.$disconnect();
});