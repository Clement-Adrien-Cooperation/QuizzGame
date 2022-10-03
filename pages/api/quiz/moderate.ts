import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const deletedQuizz = await db.quiz.update({
      where: {
        id: req.body.quiz_id
      },
      data: {
        is_visible: !req.body.is_visible
      }
    });

    res.status(200).json(deletedQuizz);
    
  } catch (error){
    res.status(404).json(error);
  };
}); 