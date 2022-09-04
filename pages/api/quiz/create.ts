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
    const quiz = await prisma.quiz.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(quiz);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});