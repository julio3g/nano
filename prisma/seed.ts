import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.schedule.deleteMany()
  await prisma.fortnight.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.payer.deleteMany()

  await prisma.employee.createMany({
    data: [
      {
        name: faker.person.fullName(),
        dailyValue: faker.number.float({ min: 1, max: 400, fractionDigits: 2 }),
      },
      {
        name: faker.person.fullName(),
        dailyValue: faker.number.float({ min: 1, max: 400, fractionDigits: 2 }),
      },
    ],
  })

  await prisma.payer.createMany({
    data: [
      { name: faker.person.fullName() },
      { name: faker.person.fullName() },
    ],
  })

  const allEmployees = await prisma.employee.findMany()
  const allPayers = await prisma.payer.findMany()

  for (let fortnight = 0; fortnight < 10; fortnight++) {
    const employee = faker.helpers.arrayElement(allEmployees)
    const payer = faker.helpers.arrayElement(allPayers)

    const startDate = faker.date.between({
      from: '2024-12-07',
      to: '2024-12-20',
    })
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 13)

    const fortnight = await prisma.fortnight.create({
      data: {
        startDate,
        endDate,
        employeeId: employee.id,
        payerId: payer.id,
        schedule: {
          create: Array.from({ length: 14 }).map(() => ({
            date: faker.date.between({ from: startDate, to: endDate }),
            morning: faker.datatype.boolean(),
            afternoon: faker.datatype.boolean(),
            overtime: faker.number.float({ min: 0, max: 10, multipleOf: 0.1 }),
            location: faker.location.city(),
          })),
        },
      },
    })

    console.log(`Created fortnight ${fortnight.id}`)
  }
}

seed().then(() => console.log('Database seeded'))
