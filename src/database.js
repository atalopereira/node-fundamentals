import fs from 'node:fs/promises'

// Create a path to the database file
const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  // Load the database file if it exists, otherwise create a new empty database
  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  // Select all data from a table
  select (table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  // Insert data into a table or create a new table if it doesn't exist
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}