import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      name: "John Doe",
    },
  });

  console.log("User Created");
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