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
    await prisma.question.deleteMany({
      where: {
        quiz_id: req.body.quizz_id
      }
    });
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});