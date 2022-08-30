import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import { sign } from 'jsonwebtoken';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const secret: any = process.env.JWT_REFRESH_SECRET;

    const token = sign(req.body, secret);
      
    res.status(201).json(token);

  } catch (error) {
    console.log(error);
  };
});