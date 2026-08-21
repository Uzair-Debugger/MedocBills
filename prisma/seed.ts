import "dotenv/config";
import { env } from "@/src/lib/env";
import prisma from "../src/lib/prisma";

async function main() {
  await prisma.admin.upsert({
    where: { email: env.ADMIN_EMAIL },
    update: {},
    create: {
      name: env.ADMIN_NAME,
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
    }
  })

  console.log("Admin Created");
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