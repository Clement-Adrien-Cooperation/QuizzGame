import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();

  if(req.body.about === 'user') {
  
    try {
      const user = await prisma.user.findUnique({
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
      const quiz = await prisma.quiz.findUnique({
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
      const question = await prisma.question.findUnique({
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
      const comment = await prisma.comment.findUnique({
        where:{
          id: req.body.about_id
        }
      });

      res.status(200).json(comment);
      
    } catch (error){
      res.status(404).json(error);
    };
  } else {
    res.status(404).json({message: "Le sujet n'est pas reconnu (user, quiz, question ou comment)"});
  };
  
  await prisma.$disconnect();
});