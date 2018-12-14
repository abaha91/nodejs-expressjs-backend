const db = require('../models/dataBase');
const mailer = require('../helpers/mailer');

module.exports = {
    get: (request, response) => {
        const skills = db.get('skills').value();
        const products = db.get('products').value();
        const title = 'Главная страница';

        response.locals.skills = skills;
        response.locals.products = products;
        response.locals.title = 'Главная страница';

        response.render('./index', [skills, products, title]);

    },
    post: (request, response) => {
        mailer(request, response);

        if(request.body) {
            db.get('users')
                .push({name: request.body.name, email: request.body.email, message: request.body.message})
                .write()
        }
    }
};