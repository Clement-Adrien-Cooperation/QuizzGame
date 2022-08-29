import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { checkUser } from '../../../middlewares/checkUser';
// import { hash } from 'bcrypt';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  // hash(req.body.password, 12, async(err, hash) => {

    const prisma = new PrismaClient();

    try {
      const user = await prisma.user.update({
        where: {
          id: req.body.id
        },
        data: {
          pseudo: req.body.pseudo,
          email: req.body.email,
          // password: hash
        }
      });

      res.status(200).json(user);
      
    } catch (error){
      console.log(error);
    };
    
    prisma.$disconnect();
  // });
});