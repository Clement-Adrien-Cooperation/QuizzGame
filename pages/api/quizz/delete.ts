import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

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

    await prisma.quiz.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(200);
    
  } catch (error){
    console.log(error);
  };
  
  prisma.$disconnect();
};