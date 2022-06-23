import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function getAlluser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await prisma.user.findMany()
    console.log(user)
    res.status(201).json(user)
    
  } catch (error){
    console.log(error)
  }
};