// scripts/initDb.ts
import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

async function initDb() {
  const db: Database = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Create a table for users
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create a table for projects
  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      project_name TEXT NOT NULL,
      description TEXT,
      construction_type TEXT,
      state TEXT,
      county TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  // (Optional) Create a table for wage logs if needed.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS wage_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      labor_type TEXT,
      wage_data TEXT,
      logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );
  `);

  console.log("Database initialized.");
  await db.close();
}

initDb().catch((err) => {
  console.error(err);
  process.exit(1);
});
