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

    const comment: any = await prisma.comment.findUnique({
      where: {
        id: req.body.id
      }
    });

    const newLikes = comment.likes + 1;
    const newIDs = [...comment.likes_IDs, req.body.user_id];

    const liked = await prisma.comment.update({
      where: {
        id: comment.id
      },
      data: {
        likes: newLikes,
        likes_IDs: newIDs
      }
    });

    res.status(200).json(liked);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});