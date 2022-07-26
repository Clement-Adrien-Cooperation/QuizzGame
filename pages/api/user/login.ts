import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.body.pseudoOrEmail.includes('@') && req.body.pseudoOrEmail.includes('.')) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.pseudoOrEmail
        }
      });
      res.status(200).json(user);
      
    }
    catch (error){
      console.log(error);
    };

  } else {
    try {
      const user = await prisma.user.findUnique({
        where: {
          pseudo: req.body.pseudoOrEmail
        }
      });
      res.status(200).json(user);
      
    }
    catch (error){
      console.log(error);
    };
  };
};