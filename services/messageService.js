import { PrismaClient } from "@prisma/client";
import moment from "moment-timezone";
import axios from "axios";

const prisma = new PrismaClient();
// the hookbin dashboard seems broken, see: https://namex-jlpt.s3.ap-southeast-1.amazonaws.com/images/Screenshot+from+2022-12-01+12-49-51.png
// const endpoint = "https://hookb.in/Z2NOQ2Mjy6CKWedKLend";
const endpoint =
  "http://ec2-52-221-157-228.ap-southeast-1.compute.amazonaws.com/test";

async function getUsers() {
  const users = await prisma.$queryRaw`
        SELECT users.id, users.email, users.first_name, users.last_name 
        FROM users
          LEFT JOIN cities
              ON users.city_id = cities.id
          WHERE HOUR(CONVERT_TZ(NOW(), 'UTC', timezone)) = '9'
          AND DAY(CONVERT_TZ(users.birth_date, 'UTC', timezone)) = DAY(CONVERT_TZ(NOW(), 'UTC', timezone))
          AND MONTH(CONVERT_TZ(users.birth_date, 'UTC', timezone)) = MONTH(CONVERT_TZ(NOW(), 'UTC', timezone))`;

  return users;
}

async function getUnsentMessages() {
  const messages = await prisma.message.findMany({
    where: {
      sentAt: null,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  return messages;
}
export async function sendBirthdayMessage() {
  const users = await getUsers();

  for (const user of users) {
    console.log(user);
    const message = await isExist(user.id);
    if (message) {
      console.log(`No action: Message already sent to ${user.email}`);
      continue;
    }

    await sendMessage(
      user,
      `Hey, ${user.first_name} ${user.last_name} it's your birthday`
    );
  }

  return;
}

export async function sendMessage(user, message) {
  let input = {
    content: message,
    user: {
      connect: {
        id: user.id,
      },
    },
  };

  await axios({
    method: "POST",
    url: endpoint,
    data: {
      email: user.email,
      message: input.content,
    },
  })
    .then(async (res) => {
      input.sentAt = moment.parseZone().toDate();
    })
    .catch(async (err) => {
      console.log(err.response.data);
    })
    .finally(async () => {
      await prisma.message.create({
        data: input,
      });
    });
}

export async function resendMessage() {
  const messages = await getUnsentMessages();

  for (const message of messages) {
    await axios({
      method: "POST",
      url: endpoint,
      data: {
        email: message.user.email,
        message: message.content,
      },
    })
      .then(async (res) => {
        await prisma.message.updateMany({
          data: {
            sentAt: moment.parseZone().toDate(),
            version: {
              increment: 1,
            },
          },
          where: {
            id: message.id,
            sentAt: null,
            version: message.version,
          },
        });
      })
      .catch(async (err) => {
        console.log(err);
      });
  }

  return;
}

async function isExist(userId) {
  const message = await prisma.message.findFirst({
    where: { userId: userId },
  });

  if (!message) {
    return false;
  }

  return true;
}
