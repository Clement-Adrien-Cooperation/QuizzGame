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
    const deletedQuizz = await prisma.quiz.update({
      where: {
        id: req.body.id
      },
      data: {
        is_visible: !req.body.is_visible
      }
    });

    res.status(201).json(deletedQuizz);
    
  } catch (error){
    res.status(404).json(error);
  };

  await prisma.$disconnect();
}); 