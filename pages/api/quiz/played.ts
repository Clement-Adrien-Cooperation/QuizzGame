import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz: any = await db.quiz.findUnique({
      where: {
        id: req.body.quiz_id
      }
    });

    const newNbOfPlayed = quiz?.nbOfPlayed + 1;

    await db.quiz.update({
      where: {
        id: req.body.quiz_id
      },
      data: {
        nbOfPlayed: newNbOfPlayed
      }
    });

    res.status(200);
    
  } catch (error){
    res.status(404).json(error);
  };
};