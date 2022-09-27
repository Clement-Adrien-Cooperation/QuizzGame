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
    const notifications = await prisma.notification.findMany({
      where: {
        user_id: req.body.user_id
      },
      orderBy: {
        date: 'desc'
      }
    });

    res.status(200).json(notifications);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});