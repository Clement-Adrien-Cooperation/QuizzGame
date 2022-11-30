import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await db.user.findMany({
      where: {
        is_banished: true
      },
      orderBy: [{
        id: 'asc'
      }]
    });

    res.status(200).json(users);

  } catch (error){
    res.status(404).json(error);
  };
});