import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {

    const quiz = await prisma.quiz.update({
      where: {
        title: req.body.currentTitle
      },
      data: {
        title: req.body.title,
        nbOfQuestions: req.body.nbOfQuestions,
        category: req.body.category,
        difficulty: req.body.difficulty
      }
    });

    res.status(201).json(quiz);
    
  } catch (error){
    console.log(error);
  };

  prisma.$disconnect();
};