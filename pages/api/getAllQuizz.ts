import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../lib/prisma';

export default async function getAllQuizz (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quizz = await prisma.quizz.findMany({
      orderBy: [{
        id: 'asc'
      }]
    });
    res.status(200).json(quizz);
    
  } catch (error){
    console.log(error);
  };
};