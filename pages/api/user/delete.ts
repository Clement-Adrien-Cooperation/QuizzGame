import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.played.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    await db.comment.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    await db.question.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    await db.quiz.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    const deleteUser = await db.user.delete({
      where: {
        id: req.body.user_id
      }
    });

    res.status(200).json(deleteUser);
    
  } catch (error){
    res.status(404).json(error);
  };
});