const db = require('../models/dataBase');
const auth = require('../helpers/auth');


module.exports = {
    get: (request, response) => {
        response.render('./login', {title: 'Страница авторизации'});
    },
    post: (request, response) => {
        const { email, password } = request.body;
        if (db.get('auth.email').value() === request.body.email) {
            auth.authorization(email, password, (err, status) => {
                if (err) {
                    return response.redirect('/login');
                }

                if (!status.email || !status.pass) {
                    return response.redirect('/login');
                }

                return response.redirect('/admin')
            });
        } else {
            auth.setUser(email, password);
            response.redirect('/');
        }
    }
};