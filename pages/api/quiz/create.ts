import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { authenticated } from '../../../middlewares/authenticated';
import db from '../../../lib/prisma';

export default authenticated(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz = await db.quiz.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(quiz);

  } catch (error){
    res.status(404).json(error);
  };
});