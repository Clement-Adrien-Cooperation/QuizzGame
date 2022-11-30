import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quizz = await db.quiz.findMany({
      where: {
        is_visible: true
      },
      orderBy: [{
        title: 'desc'
      }]
    });
    res.status(200).json(quizz);

  } catch (error){
    res.status(404).json(error);
  };
};