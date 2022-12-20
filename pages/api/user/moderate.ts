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

    if(user.is_banished) {
      await db.quiz.updateMany({
        where: {
          user_id: user.id
        },
        data: {
          is_visible: false
        }
      });

      await db.notification.create({
        data: {
          id: uuidv4(),
          user_id: user.id,
          title: "Vous avez été banni",
          message: `Votre compte a été banni du site s'Quizz Game. Surveillez votre langage ou l'exactitude de vos questions/réponses`,
          date: newDate,
          seen: false
        }
      });
    } else {
      await db.quiz.updateMany({
        where: {
          user_id: user.id
        },
        data: {
          is_visible: true
        }
      });

      await db.notification.create({
        data: {
          id: uuidv4(),
          user_id: user.id,
          title: "Vous avez été débanni",
          message: `Votre compte a été débanni du site s'Quizz Game. Surveillez votre langage ou l'exactitude de vos questions/réponses`,
          date: newDate,
          seen: false
        }
      });
    };

    res.status(200).json(user);

  } catch (error){
    res.status(404).json(error);
  };
});