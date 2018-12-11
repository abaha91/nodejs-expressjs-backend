const db = require('../models/dataBase');

module.exports = {
    get: (request, response) => {
        response.render('./login', {title: 'Страница авторизации'});
    },
    post: (request, response) => {
        if (request.body) {
            db.get('auth')
                .push({email: request.body.email, password: request.body.password})
                .write()
        }
    }
};