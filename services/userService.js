import { PrismaClient } from "@prisma/client";
import moment from "moment-timezone";

const prisma = new PrismaClient();

export async function create(body) {
  return await prisma.user.create({
    data: {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: moment.parseZone(body.birthDate, "YYYY-MM-DD").toDate(),
      city: {
        connect: {
          id: parseInt(body.cityId),
        },
      },
    },
  });
}

export async function update(id, body) {
  console.log(body);
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: moment.parseZone(body.birthDate, "YYYY-MM-DD").toDate(),
      city: {
        connect: {
          id: parseInt(body.cityId),
        },
      },
    },
  });
}

export async function destroy(id, next) {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
}
