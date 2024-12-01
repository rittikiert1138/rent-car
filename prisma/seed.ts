import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const hashPassword = await bcrypt.hash("secret", 10);

  await prisma.user.create({
    data: {
      phone: "0838427291",
      username: "master",
      password: hashPassword,
      role: "MASTER",
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
