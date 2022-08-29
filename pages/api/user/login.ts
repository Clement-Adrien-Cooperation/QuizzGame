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
          
          const token = sign(user, secret, {expiresIn: '1h'});

          res.status(200).json({
            user,
            token,
            message: 'OK'
          });
        } else {
          res.status(401).json({message: 'Wrong password'});
        };
      });
    }
    catch (error){
      res.status(401).json(error);
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
          
          const token = sign(user, secret, {expiresIn: '1h'});

          res.status(200).json({
            user,
            token,
            message: 'OK'
          });
        } else {
          res.status(401).json({message: 'Wrong password'});
        };
      });
    }
    catch (error){
      res.status(401).json(error);
    };
  };
  
  prisma.$disconnect();
};