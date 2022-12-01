import * as dotenv from "dotenv";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

async function main() {
  let cities = await getCityIds();

  shuffleArray(cities);

  let users = [];
  for (let index = 0; index < 1000; index++) {
    users[index] = {
      email: uuidv4() + "@gmail.com",
      firstName: "Name ",
      lastName: Date.now().toString(),
      birthDate: moment().subtract(20, "years").toDate(),
      cityId: cities[0].id,
    };

    shuffleArray(cities);
    index++;
  }

  await prisma.user.createMany({
    data: users,
  });
  console.log("[*] Users created");
}

async function getCityIds() {
  return await prisma.city.findMany({
    where: {
      NOT: {
        timezone: null,
      },
    },
    select: {
      id: true,
      timezone: true,
    },
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
