import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function getAllUsers (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await db.user.findMany({
      where: {
        is_banished: false
      },
      orderBy: [{
        pseudo: 'asc'
      }]
    });
    
    res.status(200).json(users);
    
  } catch (error){
    res.status(404).json(error);
  };
});