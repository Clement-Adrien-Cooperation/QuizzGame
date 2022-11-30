import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import { hash, compare } from 'bcrypt';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user: any = await db.user.findUnique({
      where: {
        id: req.body.id
      }
    });

    compare(req.body.previousPassword, user.password, async(err, result) => {
      if(!err && result) {

        hash(req.body.newPassword, 12, async(err, hash) => {
          const updateUser = await db.user.update({
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
    res.status(404).json(error);
  };
});