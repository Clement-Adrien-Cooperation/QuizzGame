import type { NextApiRequest, NextApiResponse } from 'next';
import { Notification, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();

  await prisma.$connect();
  
  try {
    const messages: Notification[] = [];
    const users = await prisma.user.findMany();

    // for each user found
    users.forEach(user => {

      // set new message with data received
      const message: Notification = {
        id: uuidv4(),
        user_id: user.id,
        title: req.body.title,
        message: req.body.message,
        date: req.body.date,
        seen: false
      };

      messages.push(message);
    });

    const notifications = await prisma.notification.createMany({
      data: [
        ...messages
      ],
      skipDuplicates: false
    });

    res.status(201).json(notifications);
    
  } catch (error){
    res.status(404).json(error);
  };
  
  await prisma.$disconnect();
});