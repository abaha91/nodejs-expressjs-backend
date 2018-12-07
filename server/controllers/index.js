const lowDB = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./models/db.json');
const db = lowDB(adapter);

module.exports = {
    get: (request, response) => {
      response.render('./index', {title: 'Главная страница'});
    },
    post: (request, response) => {
        if(request.body) {
          console.log(request.body);
            db.get('auth')
                .push({email: request.body.email, password: request.body.password})
                .write()
        }
    }
};