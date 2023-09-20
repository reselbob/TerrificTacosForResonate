// database.js
const sqlite3 = require('sqlite3').verbose();

export class DB{
  private static DB_PATH = './transfers.db';

  public static setup() {

    let db = new sqlite3.Database(this.DB_PATH, (err: any) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
    });

    db.serialize(() => {
      db.run(`
      CREATE TABLE IF NOT EXISTS transfers (
        uuid TEXT PRIMARY KEY,
        account TEXT NOT NULL,
        amount REAL NOT NULL
      )
    `);
    });

    return db
  }
}
