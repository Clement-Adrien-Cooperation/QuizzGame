import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await prisma.user.upsert({
      where: {
        pseudo: req.body.currentPseudo
      },
      update: {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
        // avatar: req.body.avatar
      },
      create: {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password
      }
    });

    res.status(200).json(user);
    
  } catch (error){
    console.log(error);
  };
};