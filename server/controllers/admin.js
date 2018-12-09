const lowDB = require('lowdb');
const formidable = require('formidable');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./models/db.json');
const db = lowDB(adapter);
const path = require('path');
const fs = require('fs');

module.exports = {
    get: (request, response) => {
        response.render('./admin', {title: 'Админка'});
    },
    saveSkills: (request, response) => {
        if (request.body) {
            db.get('skills')
                .push({
                    age: request.body.age,
                    concerts: request.body.concerts,
                    cities: request.body.cities,
                    years: request.body.years
                })
                .write()
        }
    },
    saveProduct: (req, res) => {
        let form = new formidable.IncomingForm();
        const uploadDir = path.join(__dirname, '..', '..', 'source', 'upload');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        };
        form.uploadDir = uploadDir;
        form.parse(req, (err, fields, files) => {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            };

            if (err) {
                console.log('Возникла ошибка при загрузке данных');
            }
            fs.rename(files.photo.path, path.join(uploadDir, files.photo.name), (error) => {
                if (error) {
                    console.log('Возникла ошибка при загрузке изображения');
                }

                const data = {
                    src: path.join(uploadDir, files.photo.name),
                    name: fields.name,
                    price: fields.price
                };

                db.get('products')
                    .push(data)
                    .write();

                return console.log('Продукт успешно загружен');
            })
        });
    }
}

