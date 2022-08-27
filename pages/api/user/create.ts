import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  hash(req.body.password, 12, async(err, hash) => {

    const prisma = new PrismaClient();

    try {
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash
        }
      });

      res.status(200).json(user);
      
    } catch (error){
      console.log(error);
    };
    
    prisma.$disconnect();
  });
};