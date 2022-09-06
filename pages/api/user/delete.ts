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
    await prisma.comment.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    await prisma.question.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    await prisma.quiz.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    const deleteUser = await prisma.user.delete({
      where: {
        id: req.body.user_id
      }
    });

    res.status(200).json(deleteUser);
    
  } catch (error){
    res.status(404).json(error);
  };

  await prisma.$disconnect();
});