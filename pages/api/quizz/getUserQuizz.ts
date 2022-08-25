import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function getAllQuizz (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    const quizz = await prisma.quiz.findMany({
      where: {
        creator: req.body.pseudo
      },
      orderBy: [{
        id: 'asc'
      }]
    });
    res.status(200).json(quizz);
    
  } catch (error){
    console.log(error);
  };

  prisma.$disconnect();
};