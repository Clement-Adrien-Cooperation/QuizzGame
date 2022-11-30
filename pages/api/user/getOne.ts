import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.body.user_id
      }
    });

    res.status(200).json(user);

  } catch (error){
    res.status(404).json(error);
  };
});