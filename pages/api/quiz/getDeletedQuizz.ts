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
    const quizz = await prisma.quiz.findMany({
      where: {
        is_visible: false
      }
    });
    res.status(200).json(quizz);
    
  } catch (error){
    res.status(404).json(error);
  };

  await prisma.$disconnect();
});