import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz = await prisma.quizz.create({
      data: {
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
        ...req.body
      }
    });

    res.status(201).json(quiz);
    
  } catch (error){
    console.log(error);
  };
};