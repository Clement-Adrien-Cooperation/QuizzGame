import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz = await db.quiz.update({
      where: {
        title: req.body.currentTitle
      },
      data: {
        title: req.body.title,
        category: req.body.category,
        difficulty: req.body.difficulty,
        nbOfQuestions: req.body.nbOfQuestions
      }
    });

    res.status(200).json(quiz);
    
  } catch (error){
    res.status(404).json(error);
  };
});