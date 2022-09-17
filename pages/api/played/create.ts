import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { checkUser } from '../../../middlewares/checkUser';
import { v4 as uuidv4 } from 'uuid';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const played = await prisma.played.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });
    
    res.status(201).json(played);
    
  } catch (error){
    
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});