import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.question.deleteMany({
      where: {
        quizz_id: req.body[0].quizz_id
      }
    });
    
    const question = await prisma.question.createMany({
      data: [
        ...req.body
      ]
    });

    res.status(201).json(question);
    
  } catch (error){
    console.log(error);
  };
};