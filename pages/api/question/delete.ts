import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const question = await prisma.question.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(201).json(question);
    
  } catch (error){
    console.log(error);
  };
};