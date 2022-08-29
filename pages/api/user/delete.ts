import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function handle (
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

    const deleteUser = await prisma.user.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json(deleteUser);
    
  } catch (error){
    res.status(404).json(error);
  };

  prisma.$disconnect();
});