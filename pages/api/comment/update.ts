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
    const comment = await prisma.comment.update({
      where: {
        id: req.body.id
      },
      data: {
        content: req.body.content
      }
    });

    res.status(200).json(comment);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});