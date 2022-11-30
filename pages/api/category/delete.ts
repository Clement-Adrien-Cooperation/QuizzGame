import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.category.delete({
      where: {
        id: req.body.id
      }
    });

    const categories = await db.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json(categories);

  } catch (error){
    res.status(404).json(error);
  };
});