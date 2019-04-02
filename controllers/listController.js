var config = require('../config')
var moment = require("moment");
var fs = require("fs");
var path = require('path');
//var sql = require('mssql')
moment.locale("pt-br");
const querySql = require('../config')();

// sql.connect(config, function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected ");
// });


exports.home = function (req, res) {
  res.sendFile(path.join('C:/inetpub/wwwroot/vendas/index.html'));
};


exports.listar = function (req, res) {
  var usuario = req.body.usuario ? req.body.usuario : '';
  var senha = req.body.senha ? req.body.senha : '';

  var query = "SELECT id,nome,registro FROM pca_ca_master";
  query +=
    " WHERE registro = '" + usuario + "'"
  " AND senha = '" + senha + "'";
  querySql.queryDB(query, (err, result) => {
    if (err) {
        console.dir(err);
        return;
    }
    res.json({
        query: query,
        jsonRetorno: result
    });
  });

};

exports.detalhes = function (req, res) {
  var query = " EXEC sp_pca_get_aluno ";
  query += " @REGISTRO='" + req.body.registro + "'";
  query += " ,@ID_FESTA= " + req.body.id_festa + "";

  querySql.queryDB(query, (err, result) => {
    if (err) {
        console.dir(err);
        return;
    }
    res.json({
        query: query,
        jsonRetorno: result
    });
  });
  // var conn = new sql.Request();
  // console.log(query)
  // conn.query(query, function (error, result) {
  //   if (error) {
  //     console.dir(error);
  //   }

  //   if (result.recordset.length > 0) {
  //     if (result.recordset[0].data_venda) {
  //       result.recordset[0].data_venda = moment(result.recordset[0].data_venda).format("LLL");

  //       res.json({ message: false, string: query, jsonRetorno: result.recordset });
  //     } else {
  //       res.json({ message: true, string: query, jsonRetorno: result.recordset });
  //     }
  //   } else {
  //     res.json({ message: false, string: query, jsonRetorno: [] });
  //   }
  // });

};
exports.updateVenda = function (req, res) {

  var query = " EXEC sp_pca_update_venda_aluno ";
  query += " @ID_ALUNO=" + req.body.id_aluno + "";
  query += " ,@ID_VENDEDOR=" + req.body.id_vendedor + "";
  query += " ,@VALOR=" + req.body.valor + "";
  query += " ,@SEXO='" + req.body.sexo + "'";
  query += " ,@ALIMENTO=" + req.body.flag_alimento + "";
  query += " ,@ID_FESTA=" + req.body.id_festa + "";
  query += " ,@LOTE=" + req.body.lote + "";
  query += " ,@COMBO=" + req.body.combo + "";
  query += " ,@NINGRESSO='" + req.body.numeroIngresso + "'";

  querySql.queryDB(query, (err, result) => {
    if (err) {
        console.dir(err);
        return;
    }
    res.json({
        query: query,
        jsonRetorno: result
    });
  });
  // var conn = new sql.Request();
  // conn.query(query, function (error, result) {
  //   if (error) {
  //     console.dir(error);
  //   }

  //   if (result.recordset.length > 0) {
  //     if (result.recordset[0].data_venda) {
  //       result.recordset[0].data_venda = moment(result.recordset[0].data_venda).format("LLL");

  //       res.json({ message: false, string: query, jsonRetorno: result.recordset });
  //     } else {
  //       res.json({ message: true, string: query, jsonRetorno: result.recordset });
  //     }
  //   } else {
  //     res.json({ message: false, string: query, jsonRetorno: [] });
  //   }
  // });
};

exports.detalhesConvidado = function(req, res) {
  var query = "SELECT id_venda,data_venda,nome FROM pca_festa_venda_convidado  ";
  query += " WHERE cpf = '" + req.body.cpf + "' AND id_festa = "+  req.body.id_festa + "";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }

    if (result.recordset.length > 0) {    
      res.json({ message: true, string: query, jsonRetorno: result });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });


};

exports.updateVendaConvidado = function (req, res) {

  var nome = req.body.nome ? req.body.nome : 'Sem nome';

  var query = " EXEC sp_pca_update_venda_convidado ";
  query += " @NOME='" + nome + "'";
  query += " ,@CPF='" + req.body.cpf + "'";
  query += " ,@ID_VENDEDOR=" + req.body.id_vendedor + "";
  query += " ,@VALOR=" + req.body.valor + "";
  query += " ,@SEXO='" + req.body.sexo + "'";
  query += " ,@ALIMENTO=" + req.body.flag_alimento + "";
  query += " ,@ID_FESTA=" + req.body.id_festa + "";
  query += " ,@LOTE=" + req.body.lote + "";
  query += " ,@COMBO=" + req.body.combo + "";
  query += " ,@NINGRESSO='" + req.body.numeroIngresso + "'";

  querySql.queryDB(query, (err, result) => {
    if (err) {
        console.dir(err);
        return;
    }
    res.json({
        query: query,
        jsonRetorno: result
    });
  });
  // var conn = new sql.Request();
  // conn.query(query, function (error, result) {
  //   if (error) {
  //     console.dir(error);
  //   }

    
  //   if (result.recordset.length > 0) {
  //     res.json({
  //       message: false,
  //       string: query,
  //       jsonRetorno: result.recordset
  //     });
  //   } else {
  //     res.json({
  //       message: true,
  //       string: query,
  //       jsonRetorno: []
  //     });
  //   }
    
  // });

};
exports.updateFesta = function (req, res) {
  var nome = req.body.nome ? req.body.nome : '';
  var alimento = req.body.flag_alimento ? parseInt(req.body.flag_alimento) : 0;
  var sexo = req.body.flag_sexo ? parseInt(req.body.flag_sexo) : 0;
  var camarote = req.body.flag_camarote ? parseInt(req.body.flag_camarote) : 0;


  var query = " EXEC sp_pca_update_festa ";
  query += " @NOME='" + nome + "'";
  query += " ,@ALIMENTO=" + alimento + "";
  query += " ,@SEXO=" + sexo + "";
  query += " ,@CAMAROTE=" + camarote + "";
  var conn = new sql.Request();
  conn.query(query, function (error, result) {
    if (error) {
      console.dir(error);
    }

    var lotesNormal = JSON.parse(req.body.lotesNormal);
    var lotesEspecial = camarote ? JSON.parse(req.body.lotesEspecial) : [];

    if (result.recordset.length > 0) {
      for (var i = 0; i < lotesNormal.length; i++) {
        updateComboFesta(result.recordset[0].id_festa, lotesNormal[i], 'pista');
      }
      if (camarote) {
        for (var i = 0; i < lotesEspecial.length; i++) {
          updateComboFesta(result.recordset[0].id_festa, lotesEspecial[i], 'camarote');
        }
      }
      res.json({ message: true, string: query, jsonRetorno: result.recordset });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};



function updateComboFesta(id_festa, params, label) {
  var query =
    "INSERT INTO pca_combo_lotes (id_festa,lote,valor,label,tipo) VALUES ";
  query +=
    "(" +
    id_festa +
    "," +
    params.value +
    "," +
    params.label.replace("R$ ", "") +
    ",'" +
    label +
    "','" +
    params.tipo +
    "');";
  var conn = new sql.Request();
  conn.query(query, function (error, result) {
    if (error) {
      console.dir(error);
    }
  });
};


exports.getLista = function (req, res) {
  var query = `
    select id_venda,valor,alimento,combo from pca_festa_venda_aluno where id_festa = ${req.body.id_festa} and id_vendedor = ${req.body.id_vendedor}
    union all
    select id_venda,valor,alimento,combo from pca_festa_venda_convidado where id_festa = ${req.body.id_festa} and id_vendedor = ${req.body.id_vendedor}
  `;
  querySql.queryDB(query, (err, result) => {
    if (err) {
        console.dir(err);
        return;
    }
    res.json({
        query: query,
        jsonRetorno: result
    });
  });
  // var conn = new sql.Request();
  // conn.query(query, function (error, result) {
  //   if (error) {
  //     console.dir(error);
  //   }
  //   if (result.recordset.length > 0) {
  //     res.json({ message: true, string: query, jsonRetorno: result.recordset });
  //   } else {
  //     res.json({ message: false, string: query, jsonRetorno: [] });
  //   }
  // });
};
exports.getFesta = function (req, res) {
  var query = "SELECT TOP 1 * FROM pca_festas_config ORDER BY id_festa DESC";
  querySql.queryDB(query, (err, result) => {
    if (err) {
        console.dir(err);
        return;
    }
    res.json({
        query: query,
        jsonRetorno: result
    });
  });
  // var conn = new sql.Request();
  // conn.query(query, function (error, result) {
  //   if (error) {
  //     console.dir(error);
  //   }
  //   console.log(result)
  //   if (result.recordset.length > 0) {
  //     res.json({ message: true, string: query, jsonRetorno: result.recordset });
  //   } else {
  //     res.json({ message: false, string: query, jsonRetorno: [] });
  //   }
  // });
};
exports.getComboLotes = function (req, res) {
  var query = "EXEC sp_pca_get_lote @ID=" + req.body.id_festa + "";
  var conn = new sql.Request()
  conn.query(query, function (error, result) {
    if (error) {
      console.dir(error);
    }
    if (result.recordset.length > 0) {
      res.json({ message: true, string: query, jsonRetorno: result.recordset });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};
exports.updateBaseAlunos = function (req, res) {
  var registro = req.body.registro ? req.body.registro : '';
  var nome = req.body.nome ? req.body.nome : '';
  var tronco = req.body.tronco ? req.body.tronco : '';
  var periodo = req.body.periodo ? req.body.periodo : '';
  var ano = req.body.ano ? req.body.ano : '';


  var query = "EXEC sp_pca_update_base_alunos ";
  query += " @REGISTRO='" + registro + "'";
  query += " ,@NOME='" + nome + "'";
  query += " ,@TRONCO='" + tronco + "'";
  query += " ,@PERIODO='" + periodo + "'";
  query += " ,@ANO=" + ano + "";
  var conn = new sql.Request()
  conn.query(query, function (error, result) {
    if (error) {
      console.dir(error);
    }
    if (result.recordset.length > 0) {
      res.json({ message: true, string: query, jsonRetorno: result.recordset });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};


exports.gerarExcel = function (req, res) {
  var festa = req.params.id_festa != 'all' ? req.params.id_festa : null;
  var tipo = req.params.tipo != 'all' ? req.params.tipo : null;
  var query = " EXEC sp_pca_gera_excel " + "@ID_FESTA=" + festa + ",@TIPO=" + tipo + "";
 
  querySql.queryDB(query, (err, result) => {
    if (err) {
      console.dir(err);
    }

    if (result.length > 0) {

      var excel = result;
      var body = "";
      excel.forEach(function (row) {
        body += "<tr>";
        body += "<tipo>" + row.tipo + "</tipo>"
        body += "<identificador>" + row.identificador + "</identificador>"
        body += "<vendedor>" + row.vendedor + "</vendedor>"
        body += "<lote>" + row.lote + "</lote>"
        body += "<preco>" + row.preco + "</preco>"
        body += "<data>" + moment(row.data_venda).format('MM/DD/YYYY') + "</data>"
        body += "<alimento>" + row.alimento + "</alimento>"
        body += "<sexo>" + row.sexo + "</sexo>"
        body += "<comboo>" + row.combo + "</combo>"
        body += "</tr>"
      })
      var html = "<?xml version='1.0' encoding='UTF-8'?>";
      html = html + "<table><tbody>" + body + "</tbody></table>";
      console.log(html)
      var save = fs.writeFile("vendas.xls", html, 'utf8', err => {
        if (err) throw err;
        console.log("The file has been saved!");

        var path = 'C:/inetpub/wwwroot/vendas/vendas.xls';
        res.download(path, 'vendas.xls', function (err) {
          if (err) {
            console.log(err)
          }

          console.log('download path: ' + path)
        })
      });



    } else {
      res.json({ message: false, string: query, caminho: '' });
    }
  });

};

exports.delete = function (req, res) {
  var id = req.body.id ? req.body.id : '';
  var tipo = req.body.tipo ? req.body.tipo : '';


  var query = `EXEC sp_pca_delete_venda @TIPO='${tipo}' ,@id=${id} `;

  var conn = new sql.Request()
  conn.query(query, function (error, result) {
    if (error) {
      console.dir(error);
    }
    if (result.recordset.length > 0) {
      res.json({ message: true, string: query, jsonRetorno: result.recordset });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};
