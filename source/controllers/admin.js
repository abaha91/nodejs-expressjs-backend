module.exports.renderPage = function(request, response) {
  response.render('./admin', {title: 'Админка'});
};