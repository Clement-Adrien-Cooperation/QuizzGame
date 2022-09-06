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
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user_id
      }
    });
    
    res.status(200).json(user);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});