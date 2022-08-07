import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const questions = await prisma.question.findMany({
      where: {
        quizz_id: req.body.quizz_id
      }
    });

    res.status(201).json(questions);
    
  } catch (error){
    console.log(error);
  };
};