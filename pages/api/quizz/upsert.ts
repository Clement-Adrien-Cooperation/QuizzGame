import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const quiz = await prisma.quizz.upsert({
      where: {
        title: req.body.currentTitle
      },
      update: {
        title: req.body.title,
        nbOfQuestions: req.body.nbOfQuestions,
        category: req.body.category,
        difficulty: req.body.difficulty
      },
      create: {
        user_id: req.body.user_id,
        creator: req.body.creator,
        title: req.body.title,
        nbOfQuestions: req.body.nbOfQuestions,
        category: req.body.category,
        difficulty: req.body.difficulty,
        date: new Date().toLocaleDateString()
      }
    });

    res.status(201).json(quiz);
    
  } catch (error){
    console.log(error);
  };
};