import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const comment = await db.comment.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(comment);

  } catch (error){
    res.status(404).json(error);
  };
});