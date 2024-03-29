import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json(categories);

  } catch (error){
    res.status(404).json(error);
  };
};