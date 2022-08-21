import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const deletedQuizz = await prisma.quizz.update({
      where: {
        id: req.body.id
      },
      data: {
        is_visible: req.body.is_visible
      }
    });

    res.status(201).json(deletedQuizz);
    
  } catch (error){
    console.log(error);
  };
}; 