import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await db.user.update({
      where: {
        id: req.body.user_id
      },
      data: {
        is_banished: !req.body.is_banished
      }
    });

    const newDate = new Date().toLocaleDateString();

    await db.notification.create({
      data: {
        id: uuidv4(),
        user_id: user.id,
        title: "Bannissement de votre compte",
        message: `Votre compte a été banni. Surveillez votre langage ou l'exactitude de vos questions/réponses`,
        date: newDate,
        seen: false
      }
    });

    res.status(200).json(user);
    
  } catch (error){
    res.status(404).json(error);
  };
});