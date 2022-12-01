import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  const cities = await prisma.city.findMany({
    where: {
      NOT: {
        timezone: null,
      },
    },
    select: {
      id: true,
      city: true,
      country: true,
    },
  });

  return cities;
}
