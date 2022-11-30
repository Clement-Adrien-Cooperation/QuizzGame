import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const played = await db.played.findMany({
      where: {
        user_id: req.body.user_id
      }
    });

    res.status(200).json(played);

  } catch (error){

    res.status(404).json(error);
  };
};