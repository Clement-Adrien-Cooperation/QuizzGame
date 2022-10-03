import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBanishedUser } from '../../../middlewares/checkBanishedUser';
import db from '../../../lib/prisma';

export default checkBanishedUser(async function handle (
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
    
  console.log('dans le catch');
    res.status(404).json(error);
  };
});