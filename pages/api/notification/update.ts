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
    const notification = await prisma.notification.update({
      where: {
        id: req.body.id
      },
      data: {
        seen: true
      }
    });

    res.status(201).json(notification);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});