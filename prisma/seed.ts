import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cryptoRandomString from "crypto-random-string";
const prisma = new PrismaClient();
import { nanoid } from "nanoid";
async function main() {
  const hashPassword = await bcrypt.hash("secret", 10);
  const randomString = nanoid(10);

  await prisma.user.create({
    data: {
      phone: "0838427290",
      username: "master",
      password: hashPassword,
      role: "MASTER",
      user_path: randomString,
      status: 1,
      createdBy: 1,
      updatedBy: 1,
    },
  });
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
