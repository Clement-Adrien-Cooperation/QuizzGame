import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';
import { isAdmin } from '../../../middlewares/isAdmin';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const reports = await db.report.findMany({
      orderBy: {
        date: 'asc'
      }
    });

    res.status(200).json(reports);

  } catch (error){
    res.status(404).json(error);
  };
});