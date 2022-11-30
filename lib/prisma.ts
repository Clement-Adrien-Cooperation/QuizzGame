// Solution found on the web for not running many instances of Prisma Client at the same time

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
  console.log('Production: Created DB connection.');
} else {
  // @ts-ignore
  if (!global.db) {
    // @ts-ignore
    global.db = new PrismaClient();
    console.log('Development: Created DB connection.');
  };

  // @ts-ignore
  db = global.db;
};

// @ts-ignore
db.$executeRaw('PRAGMA foreign_keys = ON');

export default db;