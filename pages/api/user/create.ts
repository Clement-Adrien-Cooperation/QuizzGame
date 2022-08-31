import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const secret: any = process.env.JWT_SECRET;

  hash(req.body.password, 12, async(err, hash) => {

    if(err) {

      res.status(404).json(err);

    } else {

      const prisma = new PrismaClient();

      await prisma.$connect();

      try {
        const user = await prisma.user.create({
          data: {
            id: uuidv4(),
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash
          }
        });

        const token = sign(user, secret, {expiresIn: '1800s'});

        res.status(201).json({
          user,
          token,
          message: 'Created'
        });
        
      } catch (error){
        res.status(404).json(error);
      };
      
      await prisma.$disconnect();
    };
  });
};