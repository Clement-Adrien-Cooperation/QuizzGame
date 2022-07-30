import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    pseudo: 'Vadrial',
    email: 'adrienlcp@gmail.com',
    password: 'TDYQCM&S3o!zao6i',
    is_admin: true
  },
  {
    pseudo: 'Penrose',
    email: 'clement.charlesC@gmail.com',
    password: 'admin',
    is_admin: true
  },
  {
    pseudo: 'Jojo l\'asticot',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Victor',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Miriam',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Hagrid',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'JUL',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Jorys',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Serious Jane',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Strawberry Newman',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Fièvre jaune',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Laura Ralau',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Benzaming',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  },
  {
    pseudo: 'Clothilde & Mathilde',
    email: 'fauxuser@gmail.com',
    password: 'lechienduvoisinabouffémescouilles',
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })