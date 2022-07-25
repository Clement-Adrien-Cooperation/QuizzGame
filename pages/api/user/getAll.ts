import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function getAllUsers (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany({
      where: {
        is_banished: false
      },
      orderBy: [{
        id: 'asc'
      }]
    });
    res.status(200).json(users);
    
  } catch (error){
    console.log(error);
  };
};