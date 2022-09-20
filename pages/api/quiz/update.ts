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
        category: req.body.category,
        difficulty: req.body.difficulty,
        nbOfQuestions: req.body.nbOfQuestions
      }
    });

    res.status(200).json(quiz);
    
  } catch (error){
    res.status(404).json(error);
    console.log(error);
    
  };

  await prisma.$disconnect();
});