import dotenv from "dotenv";
dotenv.config();

export default {
  databaseUrl: process.env.DATABASE_URL,
  migrationsTable: "pgmigrations",
  dir: "migrations",
  direction: "up",
  log: console.log,
  ssl: { rejectUnauthorized: false }
};
