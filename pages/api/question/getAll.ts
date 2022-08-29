import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    
    const questions = await prisma.question.findMany();

    res.status(201).json(questions);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  prisma.$disconnect();
});