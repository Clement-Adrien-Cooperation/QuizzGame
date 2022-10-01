import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { checkUser } from '../../../middlewares/checkUser';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const comment = await prisma.comment.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(comment);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});