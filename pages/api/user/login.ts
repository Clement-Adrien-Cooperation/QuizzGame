import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { compare } from 'bcrypt';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

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

          res.status(200).json({message: 'OK'});
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

          res.status(200).json({user, message: 'OK'});
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