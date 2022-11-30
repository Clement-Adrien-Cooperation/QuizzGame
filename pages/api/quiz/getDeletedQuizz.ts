import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quizz = await db.quiz.findMany({
      where: {
        is_visible: false
      }
    });
    res.status(200).json(quizz);

  } catch (error){
    res.status(404).json(error);
  };
});