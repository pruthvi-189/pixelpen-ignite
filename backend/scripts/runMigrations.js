import fs from "fs";
import path from "path";
import db from "../config/db.js";

const migrationsPath = path.resolve("./migrations");

async function runMigrations() {
  const files = fs.readdirSync(migrationsPath);

  for (const file of files) {
    const migration = await import(`../migrations/${file}`);
    await migration.up(db);
    console.log(`Ran migration: ${file}`);
  }

  process.exit();
}

runMigrations();

