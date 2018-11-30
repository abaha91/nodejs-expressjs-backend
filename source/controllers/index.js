const path = require('path');

module.exports.renderPage = function(request, response) {
  response.render('./index', {title: 'Главная страница'});
};