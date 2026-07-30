import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = globalThis as unknown as {
  prisma_v4: PrismaClient | undefined;
};

// Use environment variables or fallback to local SQLite for development
let url = process.env.DATABASE_URL || "file:./dev.db";

// Next.js fetch polyfill often fails with libsql:// web socket connections.
// Forcing it to https:// ensures HTTP fetch is used which is stable in Next.js Server Components.
if (url.startsWith("libsql://")) {
  url = url.replace("libsql://", "https://");
}

process.env.DATABASE_URL = url; // Force Prisma Engine to see the parsed URL in case Next.js hides it
const authToken = process.env.DATABASE_AUTH_TOKEN;

const adapter = new PrismaLibSql({
  url,
  authToken,
});

export const db =
  globalForPrisma.prisma_v4 ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma_v4 = db;
