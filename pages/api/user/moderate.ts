import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await db.user.update({
      where: {
        id: req.body.user_id
      },
      data: {
        is_banished: !req.body.is_banished
      }
    });

    res.status(200).json(user);
    
  } catch (error){
    res.status(404).json(error);
  };
});