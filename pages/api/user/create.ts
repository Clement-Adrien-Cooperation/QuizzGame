import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(200).json(user);
    
  } catch (error){
    console.log(error);
  };
  
  prisma.$disconnect();
};