module.exports = function(app) {
  var list = require('./controllers/listController');

  // todoList Routes
  app.route('/lista')
    .post(list.listar);
  app.route('/detalhes')
    .post(list.detalhes);
  app.route('/update_venda')
    .post(list.updateVenda);
  app.route('/log')
    .post(list.log);
  app.route('/mapa')
    .get(list.listMap);

};
