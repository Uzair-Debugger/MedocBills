import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined. Add it to your .env file.");
}

const PrismaClientSingleton = () => {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}