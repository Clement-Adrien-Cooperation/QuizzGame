import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.update({
      where: {
        id: req.body.user_id
      },
      data: {
        is_admin: !req.body.is_admin
      }
    });

    res.status(200).json(user);
    
  } catch (error){
    console.log(error);
  };
  
  prisma.$disconnect();
};