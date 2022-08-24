import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
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
};