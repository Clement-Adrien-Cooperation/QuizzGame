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
        user_id: req.body.id
      }
    });

    await prisma.question.deleteMany({
      where: {
        user_id: req.body.id
      }
    });

    await prisma.quiz.deleteMany({
      where: {
        user_id: req.body.id
      }
    });

    const user = await prisma.user.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json(user);
    
  } catch (error){
    console.log(error);
  };

  prisma.$disconnect();
};