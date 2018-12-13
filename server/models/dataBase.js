const fs = require('fs');
const config = require('../config');
const lowDB = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(config.dataBaseUrl);
const db = lowDB(adapter);

const dbSize = fs.statSync(config.dataBaseUrl).size;

if (dbSize < 3) {
  db.defaults({ users: [], auth: [], products: [], skills: [] })
    .write();
}

module.exports = db;