import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz = await prisma.quizz.delete({
      where: {
        title: req.body.title
      }
    });
    res.status(200).json(quiz);
    
  } catch (error){
    console.log(error);
  };
};