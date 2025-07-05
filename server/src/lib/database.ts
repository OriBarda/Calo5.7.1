import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

// Database connection configuration
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    console.error("❌ DATABASE_URL environment variable is not set");
    console.log("💡 Please set DATABASE_URL in your .env file");
    console.log("💡 Example: DATABASE_URL=\"postgresql://user:password@localhost:5432/dbname\"");
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return url;
};

export const prisma =
  globalThis.__prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    errorFormat: "pretty",
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV === "development") {
  globalThis.__prisma = prisma;
}

// Test database connection
prisma.$connect()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    console.log("💡 Make sure your database is running and the connection string is correct");
  });

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});