const express = require('express');
const app = express();
const path = require('path');
const lowDB = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowDB(adapter);
const bodyParser = require('body-parser');

app.set('views', './source/views/pages');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./source/routes/index'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (request, response) => {
    if(request.body) {
        db.get('users')
            .push({name: request.body.name, email: request.body.email, message: request.body.message})
            .write()
    }
});

app.post('/login', (request, response) => {
    if(request.body) {
        db.get('auth')
            .push({email: request.body.email, password: request.body.password})
            .write()
    }
});

const server = app.listen(process.env.PORT || 3012, () => {
  console.log('Server started in ' + server.address().port + ' port');
});



if(!db.users) {
    db.defaults({ users: [], auth: [], products: [], skills: [] })
        .write();
}


