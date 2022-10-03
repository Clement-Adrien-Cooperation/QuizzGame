import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const comment = await db.comment.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json(comment);
    
  } catch (error){
    res.status(404).json(error);
  };
});