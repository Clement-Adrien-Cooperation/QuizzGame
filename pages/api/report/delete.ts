import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.report.delete({
      where: {
        id: req.body.id
      }
    });

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