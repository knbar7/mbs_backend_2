import { prisma } from "./prisma-instance";

export async function clearDb() {
  await prisma.user.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.intention.deleteMany({});
  await prisma.threeToOne.deleteMany({});
}
