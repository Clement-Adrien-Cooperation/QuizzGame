import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notifications = await db.notification.findMany({
      where: {
        user_id: req.body.user_id
      },
      orderBy: {
        date: 'desc'
      }
    });

    res.status(200).json(notifications);
    
  } catch (error){
    res.status(404).json(error);
  };
});