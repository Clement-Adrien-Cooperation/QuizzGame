import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const notification = await prisma.notification.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(notification);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});