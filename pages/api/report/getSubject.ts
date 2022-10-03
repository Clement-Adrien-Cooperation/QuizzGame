import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.body.about === 'user') {
  
    try {
      const user = await db.user.findUnique({
        where:{
          id: req.body.about_id
        }
      });

      res.status(200).json(user);
      
    } catch (error){
      res.status(404).json(error);
    };

  } else if(req.body.about === 'quiz') {

    try {
      const quiz = await db.quiz.findUnique({
        where:{
          id: req.body.about_id
        }
      });

      res.status(200).json(quiz);
      
    } catch (error){
      res.status(404).json(error);
    };

  } else if(req.body.about === 'question') {
    
    try {
      const question = await db.question.findUnique({
        where:{
          id: req.body.about_id
        }
      });

      res.status(200).json(question);
      
    } catch (error){
      res.status(404).json(error);
    };

  } else if(req.body.about === 'comment') {

    try {
      const comment = await db.comment.findUnique({
        where:{
          id: req.body.about_id
        }
      });

      res.status(200).json(comment);
      
    } catch (error){
      res.status(404).json(error);
    };
  } else {
    res.status(404).json({message: "Le sujet n'est pas reconnu ('user', 'quiz', 'question' ou 'comment' uniquement)"});
  };
});