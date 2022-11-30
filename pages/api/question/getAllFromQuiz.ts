import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const questions = await db.question.findMany({
      where: {
        quiz_id: req.body.quiz_id
      }
    });

    res.status(200).json(questions);

  } catch (error){
    res.status(404).json(error);
  };
};