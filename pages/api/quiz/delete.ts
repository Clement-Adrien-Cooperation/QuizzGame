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
    await prisma.comment.deleteMany({
      where: {
        quiz_id: req.body.id
      }
    });

    await prisma.question.deleteMany({
      where: {
        quiz_id: req.body.id
      }
    });

    const deleteQuiz = await prisma.quiz.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json(deleteQuiz);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});