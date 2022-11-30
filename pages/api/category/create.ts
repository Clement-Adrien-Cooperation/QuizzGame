import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const category = await db.category.create({
      data: {
        ...req.body
      }
    });

    res.status(201).json(category);

  } catch (error){

    res.status(404).json(error);
  };
});