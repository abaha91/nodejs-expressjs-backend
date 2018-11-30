const express = require('express');
const app = express();
const path = require('path');

app.set('views', './source/views/pages');
app.set('view engine', 'pug');

app.use('/', require('./source/routes/index'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server started in ' + server.address().port + ' port');
});


