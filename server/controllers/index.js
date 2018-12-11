const db = require('../models/dataBase');

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