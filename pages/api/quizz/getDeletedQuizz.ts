import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quizz = await prisma.quizz.findMany({
      where: {
        is_visible: false
      }
    });
    res.status(200).json(quizz);
    
  } catch (error){
    console.log(error);
  };
};