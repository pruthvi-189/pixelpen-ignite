import fs from "fs";
import path from "path";

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const timestamp = Date.now();
const fileName = `${timestamp}_${migrationName}.js`;
const migrationsDir = path.resolve("./migrations");

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir);
}

const filePath = path.join(migrationsDir, fileName);

const template = `export async function up(db) {
  // Write your CREATE TABLE or ALTER TABLE query here
}

export async function down(db) {
  // Write your rollback query here
}
`;

fs.writeFileSync(filePath, template);

console.log(`Migration created: ${fileName}`);
