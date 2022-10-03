import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('avant le try');
  
  try {
    console.log('après le try');
    await db.played.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });
    console.log('après le played');

    await db.comment.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    console.log('après le comment');
    await db.question.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    console.log('après le question');
    await db.quiz.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });
    console.log('après le quiz');

    const deleteUser = await db.user.delete({
      where: {
        id: req.body.user_id
      }
    });
    console.log('après le user');

    res.status(200).json(deleteUser);
    console.log(deleteUser);
    
    
  } catch (error){
    
  console.log('dans le catch');
    res.status(404).json(error);
  };
});