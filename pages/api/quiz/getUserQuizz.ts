import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();

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
    res.status(404).json(error);
  };

  await prisma.$disconnect();
};