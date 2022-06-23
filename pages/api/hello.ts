// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import conn from '../../data/database';

type Data = {
  name: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET") {
    res.status(200).json({data: 5})
  }
};
































/*
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method === 'GET') {
  const user =  await client.query(`SELECT * FROM "user" WHERE id=1;`)



  
   res.status(200).json({data: user})
  }
 */

/*   const findOne = async(id: number) => {
    if(req.method === 'GET') {
      try {
        const {rows} = await client.query(`SELECT * FROM "user" WHERE id=$1;`, [id]);
        res.status(200).json({data: rows})
      } catch (error) {
        throw error;
      };

    }

  }; */

/*   findOne(1);}
 */


// conn.connect().then(client => {
//   client.query('select * from "user"', ['pg-pool']).then(res => {
//     client.release()
//     console.log('hello from ma bite')
//     res.status(200).json({data: "world"})
//   })
//   .catch(e => {
//     client.release()
//     console.error('query error', e.message, e.stack)
//   })
// })

// export default conn;