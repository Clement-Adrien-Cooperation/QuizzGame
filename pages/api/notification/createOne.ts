import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notification = await db.notification.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(notification);

  } catch (error){
    res.status(404).json(error);
  };
});