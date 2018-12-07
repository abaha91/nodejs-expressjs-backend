const lowDB = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./models/db.json');
const db = lowDB(adapter);

module.exports = {
    get : (request, response) => {
        response.render('./admin', {title: 'Админка'});
    },
    saveSkills : (request, response) => {
        if(request.body) {
            console.log(request.params);
            db.get('skills')
                .push({age: request.body.age, concerts: request.body.concerts, cities: request.body.cities, years: request.body.years})
                .write()
        }
    },
    saveProduct : (request, response) => {
        if(request.body) {

          const file = path.join(__dirname, 'upload' ,request.body.photo);

          response.attachment(file);

          db.get('products')
              .push({photo: request.body.photo, name: request.body.name, price: request.body.price})
              .write()
        }
    }
};

