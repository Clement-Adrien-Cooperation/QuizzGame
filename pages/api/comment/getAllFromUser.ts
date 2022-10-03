import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const comments = await db.comment.findMany({
      where: {
        user_id: req.body.user_id
      },
      orderBy: {
        date: "asc"
      }
    });

    res.status(200).json(comments);

  } catch (error){
    res.status(404).json(error);
  };
};