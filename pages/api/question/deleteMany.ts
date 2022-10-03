import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.question.deleteMany({
      where: {
        quiz_id: req.body.quiz_id
      }
    });
    
  } catch (error){
    res.status(404).json(error);
  };
});