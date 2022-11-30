import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const comment: any = await db.comment.findUnique({
      where: {
        id: req.body.id
      }
    });

    const newLikes = comment.likes + 1;
    const newIDs = [...comment.likes_IDs, req.body.user_id];

    const liked = await db.comment.update({
      where: {
        id: comment.id
      },
      data: {
        likes: newLikes,
        likes_IDs: newIDs
      }
    });

    res.status(200).json(liked);

  } catch (error){
    res.status(404).json(error);
  };
});