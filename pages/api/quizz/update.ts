import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const quiz = await prisma.quizz.update({
      where: {
        title: req.body.currentTitle
      },
      data: {
        title: req.body.title,
        nbOfQuestions: req.body.nbOfQuestions,
        category: req.body.category,
        difficulty: req.body.difficulty
      }
    });

    res.status(201).json(quiz);
    
  } catch (error){
    console.log(error);
  };
};