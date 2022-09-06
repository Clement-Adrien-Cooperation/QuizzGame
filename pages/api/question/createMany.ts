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
    await prisma.question.deleteMany({
      where: {
        quiz_id: req.body[0].quiz_id
      }
    });
    
    const questions = await prisma.question.createMany({
      data: [
        ...req.body
      ]
    });

    res.status(201).json(questions);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});