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

  // const lottoTypeData = [
  //   {
  //     lotto_type_name: "หวยไทย",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/th.jpg",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#4287f5",
  //   },
  //   {
  //     lotto_type_name: "หวยออมสิน",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/oms.png",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#ff63fa",
  //   },
  //   {
  //     lotto_type_name: "หวยธกส.",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/tks.jpg",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#0d1a80",
  //   },
  //   {
  //     lotto_type_name: "หวยลาว",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/laos.png",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#f53b3b",
  //   },
  //   {
  //     lotto_type_name: "หวยลาวพัฒนา",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/laos.png",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#f53b3b",
  //   },
  //   {
  //     lotto_type_name: "หวยฮานอย",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/vietnam.png",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#f53b3b",
  //   },
  //   {
  //     lotto_type_name: "ฮานอยพิเศษ",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/vietnam.png",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#f53b3b",
  //   },
  //   {
  //     lotto_type_name: "ฮานอยวีไอพี",
  //     lotto_type_status: 1,
  //     lotto_type_icon: "/icons/flag/vietnam.png",
  //     lotto_type_width: "w-1/2",
  //     lotto_type_color: "#f53b3b",
  //   },
  // ];

  // const result = await prisma.lotto_type.createMany({
  //   data: lottoTypeData,
  // });

  // console.log(`Successfully created ${result.count} users.`);
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
