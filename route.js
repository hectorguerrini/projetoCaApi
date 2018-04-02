module.exports = function(app) {
  var list = require('./controllers/listController');

  // todoList Routes
  app.route('/lista')
    .post(list.listar);
  app.route('/detalhes')
    .post(list.detalhes);
  app.route('/update_venda')
    .post(list.updateVenda);
  app.route('/update_festa')
    .post(list.updateFesta);
  app.route('/get_lista_festas')
    .post(list.getListaFestas);
  app.route('/get_festa')
    .post(list.getFesta);
  app.route('/get_lotes')
    .post(list.getComboLotes);
};
