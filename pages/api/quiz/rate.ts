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
        id: req.body.quiz_id
      },
      data: {
        rate: req.body.rate,
        rates_IDs: req.body.rates_IDs
      }
    });

    res.status(200).json(quiz);
    
  } catch (error){
    res.status(404).json(error);
  };

  await prisma.$disconnect();
}); 