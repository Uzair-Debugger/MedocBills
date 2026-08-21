import "dotenv/config";
import { env } from "@/src/lib/env";
import prisma from "../src/lib/prisma";

async function main() {
  await prisma.admin.create({
    data: {
      name: "Syed Muhammad Uzair",
      email: "smuzair14cse@gmail.com",
      password: "print(U$@1r)",
    },
  });
  console.log("Admin created");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});