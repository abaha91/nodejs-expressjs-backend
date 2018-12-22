const express = require('express');
const session = require('express-session')
const flash = require('connect-flash');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');


app.use(session({
    secret: "yadayada",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', '../source/views/pages');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', require('./routes'));

const server = app.listen(process.env.PORT || 3012, () => {
  console.log('Server started in ' + server.address().port + ' port');
});

