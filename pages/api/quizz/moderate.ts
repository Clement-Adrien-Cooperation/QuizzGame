import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

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
    console.log(error);
  };

  prisma.$disconnect();
}; 