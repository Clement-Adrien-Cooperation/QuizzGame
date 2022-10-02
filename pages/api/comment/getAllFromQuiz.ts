import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const comments = await prisma.comment.findMany({
      where: {
        quiz_id: req.body.quiz_id
      },
      orderBy: {
        date: "asc"
      }
    });

    res.status(200).json(comments);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
};