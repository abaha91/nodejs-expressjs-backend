const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const lowDB = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./models/db.json');
const db = lowDB(adapter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', '../source/views/pages');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', require('./routes'));

const server = app.listen(process.env.PORT || 3012, () => {
  console.log('Server started in ' + server.address().port + ' port');
});

const dbSize = fs.statSync('./models/db.json').size;
if (dbSize <= 2){
    db.defaults({ users: [], auth: [], products: [], skills: [] })
        .write();
}

