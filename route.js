module.exports = function(app) {
  var list = require('./controllers/listController');


  // todoList Routes
  app.route('/projetoCaApi/')
    .get(list.home);
  app.route('/projetoCaApi/lista')
    .post(list.listar);
  app.route('/projetoCaApi/detalhes')
    .post(list.detalhes);
  app.route('/detalhes_convidado')
    .post(list.detalhesConvidado);
  app.route('/projetoCaApi/update_venda')
    .post(list.updateVenda);
  app.route('/update_venda_convidado')
    .post(list.updateVendaConvidado);
  app.route('/projetoCaApi/update_festa')
    .post(list.updateFesta);
  app.route('/projetoCaApi/get_lista_festas')
    .post(list.getListaFestas);
  app.route('/projetoCaApi/get_festa')
    .post(list.getFesta);
  app.route('/projetoCaApi/get_lotes')
    .post(list.getComboLotes);
  app.route('/projetoCaApi/excel/download/:id_festa/:tipo')
    .get(list.gerarExcel)
 
};
