import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {

    const reports = await prisma.report.findMany({
      orderBy: {
        date: 'asc'
      }
    });

    res.status(200).json(reports);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});