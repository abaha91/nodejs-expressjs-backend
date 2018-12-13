const db = require('../models/dataBase');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const config = require('../config');

module.exports = {
    get: (request, response) => {
        response.render('./admin', {title: 'Админка'});
    },
    saveSkills: (request, response) => {
        if (request.body) {
            db.set('skills', []).write();
            db.get('skills')
                .push({
                    number: request.body.age,
                    text: 'Возраст начала занятий на скрипке'
                  },
                  {
                    number: request.body.concerts,
                    text: 'Концертов отыграл'
                  },
                  {
                    number:request.body.cities,
                    text: 'Максимальное число городов в туре'
                  },
                  {
                    number: request.body.years,
                    text: 'Лет на сцене в качестве скрипача'
                  })
                .write()
        }
    },
    saveProduct: (req, res) => {
        const form = new formidable.IncomingForm();
        const uploadDir = config.uploadDirectory;
        const uploadDirPath = config.uploadDirectoryPath;

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        };

        form.uploadDir = uploadDir;
        form.parse(req, (err, fields, files) => {

          if (err) {
              console.log('Возникла ошибка при загрузке данных');
          }

          fs.rename(files.photo.path, path.join(uploadDir, files.photo.name), (error) => {

              if (error) {
                  console.log('Возникла ошибка при загрузке изображения');
              }

              const data = {
                  src: path.join(uploadDirPath, files.photo.name),
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

