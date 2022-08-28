import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const secret: any = process.env.JWT_SECRET;
  
  const prisma = new PrismaClient();

  if(req.body.pseudoOrEmail.includes('@') && req.body.pseudoOrEmail.includes('.')) {
    try {
      const user: any = await prisma.user.findUnique({
        where: {
          email: req.body.pseudoOrEmail
        }
      });

      compare(req.body.password, user.password, async(err, result) => {
        if(!err && result) {
          
          const jwt = sign(user, secret, {expiresIn: '1h'});

          res.status(200).json({
            user,
            token: jwt,
            message: 'OK'
          });
        } else {
          res.status(404).json({message: 'Wrong password'});
        };
      });
    }
    catch (error){
      console.log(error);
    };

  } else {
    try {
      const user: any = await prisma.user.findUnique({
        where: {
          pseudo: req.body.pseudoOrEmail
        }
      });

      compare(req.body.password, user.password, async(err, result) => {
        if(!err && result) {
          
          const jwt = sign(user, secret, {expiresIn: '1h'});

          res.status(200).json({
            user,
            token: jwt,
            message: 'OK'
          });
        } else {
          res.status(404).json({message: 'Wrong password'});
        };
      });
    }
    catch (error){
      console.log(error);
    };
  };
  
  prisma.$disconnect();
};