import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { checkUser } from '../../../middlewares/checkUser';
import { hash, compare } from 'bcrypt';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  try {
    const user: any = await prisma.user.findUnique({
      where: {
        id: req.body.id
      }
    });

    compare(req.body.password, user.password, async(err, result) => {
      if(!err && result) {

        hash(req.body.password, 12, async(err, hash) => {
          const updateUser = await prisma.user.update({
            where: {
              id: user.id
            },
            data: {
              password: hash
            }
          });

          res.status(200).json(updateUser);
          
        });

      } else {
        res.status(401).json({message: "L'ancien mot de passe ne correspond pas"})
      };
    });

  } catch (error){
    console.log(error);
  };
  prisma.$disconnect();
});