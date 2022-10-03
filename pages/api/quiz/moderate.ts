import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quiz = await db.quiz.update({
      where: {
        id: req.body.quiz_id
      },
      data: {
        is_visible: !req.body.is_visible
      }
    });

    const newDate = new Date().toLocaleDateString();

    await db.notification.create({
      data: {
        id: uuidv4(),
        user_id: quiz.user_id,
        title: "Modération de quiz",
        message: `Votre quiz ${quiz.title} a été supprimé ou restauré. Surveillez votre langage ou l'exactitude de vos questions/réponses`,
        date: newDate,
        seen: false
      }
    });

    res.status(200).json(quiz);
    
  } catch (error){
    res.status(404).json(error);
  };
}); 