import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { authenticated } from '../../../middlewares/authenticated';

export default authenticated(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();

  try {
    const deletedQuizz = await prisma.quiz.update({
      where: {
        id: req.body.quiz_id
      },
      data: {
        rate: req.body.rate
      }
    });

    res.status(201).json(deletedQuizz);
    
  } catch (error){
    res.status(404).json(error);
  };

  await prisma.$disconnect();
}); 