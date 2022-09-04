import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const prisma = new PrismaClient();

    await prisma.$connect();

    const quiz = await prisma.quiz.findUnique({
      where: {
        title: req.body.title
      }
    });
    res.status(200).json(quiz);

    await prisma.$disconnect();

  } catch (error){
    res.status(404).json(error);
  };
};