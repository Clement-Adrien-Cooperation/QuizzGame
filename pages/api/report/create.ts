import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { authenticated } from '../../../middlewares/authenticated';

export default authenticated(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const report = await prisma.report.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });
    
    res.status(201).json(report);

    console.log(report);
    
    
  } catch (error){
    
    res.status(404).json(error);
    console.log(error);
    
  };
  
  await prisma.$disconnect();
});