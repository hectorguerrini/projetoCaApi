module.exports = function(app) {
  var list = require('./controllers/listController');


  // todoList Routes
  app.route('/vendas/')
    .get(list.home);
  app.route('/vendas/lista')
    .post(list.listar);
  app.route('/vendas/detalhes')
    .post(list.detalhes);
  app.route('/vendas/detalhes_convidado')
    .post(list.detalhesConvidado);

  app.route('/vendas/update_venda')
    .post(list.updateVenda);
  app.route('/vendas/update_base_alunos')
    .post(list.updateBaseAlunos);
  app.route('/vendas/update_venda_convidado')
    .post(list.updateVendaConvidado);
  app.route('/vendas/update_festa')
    .post(list.updateFesta);
  
    app.route('/vendas/get_lista')
    .post(list.getLista);
	app.route('/vendas/get_lista_festas')
    .get(list.getListaFestas);

  app.route('/vendas/get_festa/:id')
    .get(list.getFesta);
  app.route('/vendas/get_lotes/:id_festa')
    .get(list.getComboLotes);
  app.route('/vendas/excel/download/:id_festa/:tipo')
    .get(list.gerarExcel)
  app.route('/vendas/delVenda')
    .post(list.delete)
};
