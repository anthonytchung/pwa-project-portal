// src/lib/db.ts
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Optional: Enable verbose logging for debugging
sqlite3.verbose();

export async function openDb(): Promise<Database> {
  return open({
    filename: "./database.sqlite", // Path to your SQLite file
    driver: sqlite3.Database,
  });
}
