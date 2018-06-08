module.exports = function(app) {
  var list = require('./controllers/listController');


  // todoList Routes
  app.route('/vendas/')
    .get(list.home);
  app.route('/vendas/lista')
    .post(list.listar);
  app.route('/vendas/detalhes')
    .post(list.detalhes);
  app.route('/detalhes_convidado')
    .post(list.detalhesConvidado);
  app.route('/vendas/update_venda')
    .post(list.updateVenda);
  app.route('/update_venda_convidado')
    .post(list.updateVendaConvidado);
  app.route('/vendas/update_festa')
    .post(list.updateFesta);
  app.route('/vendas/get_lista_festas')
    .post(list.getListaFestas);
  app.route('/vendas/get_festa')
    .post(list.getFesta);
  app.route('/vendas/get_lotes')
    .post(list.getComboLotes);
  app.route('/vendas/excel/download/:id_festa/:tipo')
    .get(list.gerarExcel)
 
};
