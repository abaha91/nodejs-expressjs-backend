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
            db.get('users')
                .push({name: request.body.name, email: request.body.email, message: request.body.message})
                .write()
        }
    }
};