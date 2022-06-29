import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.body.user_id
      },
      data: {
        pseudo: req.body.pseudo,
        email: req.body.email,
        avatar: req.body.avatar,
        is_banished: req.body.is_banished,
        is_admin: req.body.is_admin
      }
    });
    res.status(200).json(user);
    
  } catch (error){
    console.log(error);
  };
};