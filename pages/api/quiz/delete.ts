import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.report.deleteMany({
      where: {
        about_id: req.body.quiz_id
      }
    });

    await db.comment.deleteMany({
      where: {
        quiz_id: req.body.quiz_id
      }
    });

    await db.question.deleteMany({
      where: {
        quiz_id: req.body.quiz_id
      }
    });

    const deleteQuiz = await db.quiz.delete({
      where: {
        id: req.body.quiz_id
      }
    });

    res.status(200).json(deleteQuiz);
  
  } catch (error){
    res.status(404).json(error);
  };
});