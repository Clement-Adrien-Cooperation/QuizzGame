import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const questions = await db.question.findMany();

    res.status(201).json(questions);
    
  } catch (error){
    res.status(404).json(error);
  };
});