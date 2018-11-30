module.exports.renderPage = function(request, response) {
  response.render('./login', {title: 'Страница авторизации'});
};