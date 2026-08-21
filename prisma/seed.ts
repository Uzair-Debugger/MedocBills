import "dotenv/config";
import bcrypt from "bcryptjs"
import { env } from "@/src/lib/env";
import prisma from "../src/lib/prisma";

const SALTROUNDS = 10;

async function main() {
  const password = "print(U$@1r)";
  const hashPassword = await bcrypt.hash(password, SALTROUNDS)

  await prisma.admin.create({
    data: {
      name: "Syed Muhammad Uzair",
      email: "smuzair14cse@gmail.com",
      password: hashPassword,
    },
  });
  console.log("Admin created");

  // await prisma.admin.delete({
  //   where: {email: "smuzair14cse@gmail.com"},
  // })

  // console.log("Admin Deleted!")
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});