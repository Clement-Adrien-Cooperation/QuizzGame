import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const createUser = await prisma.user.create({
      data: {
        ...req.body
      }
    });

    res.status(201).json(createUser);
    
  } catch (error){
    console.log(error);
  };
};