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

app.post('/admin/upload', (request, response) => {
  if(request.body) {
    console.log(request.params);
    db.get('products')
        .push({photo: request.body.photo, name: request.body.name, price: request.body.price})
        .write()
  }
});

app.post('/admin/skills', (request, response) => {
  if(request.body) {
    console.log(request.params);
    db.get('skills')
      .push({age: request.body.age, concerts: request.body.concerts, cities: request.body.cities, years: request.body.years})
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


