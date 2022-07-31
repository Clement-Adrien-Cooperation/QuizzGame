import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz = await prisma.quizz.upsert({
      where: {
        title: req.body.title
      },
      update: {
        ...req.body
      },
      create: {
        ...req.body
      }
    });

    res.status(201).json(quiz);
    
  } catch (error){
    console.log(error);
  };
};