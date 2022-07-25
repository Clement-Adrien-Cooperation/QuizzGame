import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const createQuizz = await prisma.quizz.create({
      data: {
        ...req.body
      }
    });

    res.status(201).json(createQuizz);
    
  } catch (error){
    console.log(error);
  };
};