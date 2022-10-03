import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz = await db.quiz.findUnique({
      where: {
        title: req.body.title
      }
    });

    res.status(200).json(quiz);

  } catch (error){
    res.status(404).json(error);
  };
};