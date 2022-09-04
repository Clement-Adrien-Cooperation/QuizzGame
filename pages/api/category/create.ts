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
    const category = await prisma.category.create({
      data: {
        ...req.body
      }
    });
    
    res.status(201).json(category);
    
  } catch (error){
    
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});