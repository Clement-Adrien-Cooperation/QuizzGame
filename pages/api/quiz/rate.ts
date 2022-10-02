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

    const quiz: any = await prisma.quiz.findUnique({
      where: {
        id: req.body.quiz_id
      }
    });

    const newRate = [...quiz.rate, req.body.user_rate];
    const newIDs = [...quiz.rates_IDs, req.body.user_id];

    const rated = await prisma.quiz.update({
      where: {
        id: quiz.id
      },
      data: {
        rate: newRate,
        rates_IDs: newIDs
      }
    });

    res.status(200).json(rated);
    
  } catch (error){
    res.status(404).json(error);
  };

  await prisma.$disconnect();
}); 