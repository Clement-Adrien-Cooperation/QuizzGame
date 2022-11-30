import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notification = await db.notification.update({
      where: {
        id: req.body.id
      },
      data: {
        seen: true
      }
    });

    res.status(201).json(notification);

  } catch (error){
    res.status(404).json(error);
  };
});