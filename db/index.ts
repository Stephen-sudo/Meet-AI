import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("Environment variable DATABASE_URL is not set.");
}
export const db = drizzle(databaseUrl);
