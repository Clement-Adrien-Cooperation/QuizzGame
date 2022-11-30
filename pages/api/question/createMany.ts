import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticated } from '../../../middlewares/authenticated';
import db from '../../../lib/prisma';

export default authenticated(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.question.deleteMany({
      where: {
        quiz_id: req.body[0].quiz_id
      }
    });

    const questions = await db.question.createMany({
      data: [
        ...req.body
      ]
    });

    res.status(201).json(questions);

  } catch (error){
    res.status(404).json(error);
  };
});