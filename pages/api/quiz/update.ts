import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { checkUser } from '../../../middlewares/checkUser';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();

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
    res.status(404).json(error);
  };

  await prisma.$disconnect();
});