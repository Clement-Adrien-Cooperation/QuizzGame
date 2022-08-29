import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        title: req.body.title
      }
    });
    res.status(200).json(quiz);
    
  } catch (error){
    res.status(404).json(error);
  };

  prisma.$disconnect();
};