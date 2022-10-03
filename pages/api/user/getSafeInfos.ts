import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await db.user.findUnique({
      where: {
        pseudo: req.body.pseudo
      }
    });
    
    res.status(200).json({
      id: user?.id,
      pseudo: user?.pseudo,
      is_banished: user?.is_banished
    });
    
  } catch (error){
    res.status(404).json(error);
  };
};