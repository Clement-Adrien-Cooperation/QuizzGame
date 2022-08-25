import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

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
    console.log(error);
  };
  
  prisma.$disconnect();
};