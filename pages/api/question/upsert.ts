import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const question = await prisma.question.upsert({
      where: {
        id: req.body.id
      },
      update: {
        ...req.body
      },
      create: {
        ...req.body
      }
    });

    res.status(201).json(question);
    
  } catch (error){
    console.log(error);
  };
};