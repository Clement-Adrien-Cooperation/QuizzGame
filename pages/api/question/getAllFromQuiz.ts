import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    
    const questions = await prisma.question.findMany({
      where: {
        quiz_id: req.body.quiz_id
      }
    });

    res.status(201).json(questions);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  prisma.$disconnect();
};