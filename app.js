const express = require('express');
const app = express();
const path = require('path');
const lowDB = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowDB(adapter);

app.set('views', './source/views/pages');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./source/routes/index'));

app.post('/', (request, response) => {
  response.send('response');
});

const server = app.listen(process.env.PORT || 3012, () => {
  console.log('Server started in ' + server.address().port + ' port');
});


