var moment = require("moment");
moment.locale("pt-br");
var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "projetoca",
  database: "pca"
});

conn.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + conn.threadId);
});

exports.listar = function(req, res) {
  var query = "SELECT id_aluno,nome,registro FROM pca_ca_master";
  query +=
    " WHERE registro = '" +
    req.body.usuario +
    "'AND senha = '" +
    req.body.senha +
    "'";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
    if (result.length > 0) {
      res.json({ message: true, string: query, jsonRetorno: result });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};

exports.detalhes = function(req, res) {
  var query = "SELECT id_aluno,nome FROM pca_base_alunos";
  query += " WHERE registro = '" + req.body.registro + "'";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
    if (result.length > 0) {
      res.json({ message: true, string: query, jsonRetorno: result });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};
exports.updateVenda = function(req, res) {
  var query = "SELECT id_venda,data_venda FROM pca_festa_venda_aluno ";
  query += "WHERE id_aluno = " + req.body.id_aluno + " AND id_festa = 1";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }

    if (result.length > 0) {
      result[0].data_venda = moment(result[0].data_venda).format("LLL");

      res.json({ message: false, string: query, jsonRetorno: result });
    } else {
      var query2 =
        "INSERT INTO pca_festa_venda_aluno (id_aluno,id_vendedor,valor,sexo,alimento,data_venda,id_festa) VALUES ";
      query2 +=
        "(" +
        req.body.id_aluno +
        "," +
        req.body.id_vendedor +
        "," +
        req.body.valor +
        ",'" +
        req.body.sexo +
        "'," +
        req.body.flag_alimento +
        ",now()," +
        "1)";
      conn.query(query2, function(error, result) {
        if (error) {
          console.dir(error);
        }

        if (result.affectedRows > 0) {
          res.json({ message: true, string: query2, jsonRetorno: result });
        } else {
          res.json({ message: false, string: query2, jsonRetorno: [] });
        }
      });
    }
  });
};
exports.updateFesta = function(req, res) {
  var query =
    "INSERT INTO pca_festas_config (nome,lote_ativo,flag_alimento,flag_sexo) VALUES ";
  query +=
    "('" +
    req.body.nome +
    "'," +
    req.body.lote +
    "," +
    req.body.flag_alimento +
    "," +
    req.body.flag_sexo +
    ")";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
    var lote = JSON.parse(req.body.lotes);
    if (result.affectedRows > 0) {
        for(var i = 0; i<lote.length;i++){
            updateComboFesta(result.insertId,lote[i]);
        }
        res.json({ message: true, string: query, jsonRetorno: result });
    } else {
        res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};
    function updateComboFesta(id_festa,params){
        console.dir(params)
    var query =
      "INSERT INTO pca_combo_lotes (id_festa,lote,valor) VALUES ";
    query +=
      "(" +
      id_festa +
      "," +
      params.value +
      "," +
      params.label.replace("R$ ","") +
      ");";
    conn.query(query, function(error, result) {
      if (error) {
        console.dir(error);
      }
    });
  };


exports.getListaFestas = function(req, res) {
    var query = "SELECT * FROM pca_festas_config";
    conn.query(query, function(error, result) {
      if (error) {
        console.dir(error);
      }
      if (result.length > 0) {
        res.json({ message: true, string: query, jsonRetorno: result });
      } else {
        res.json({ message: false, string: query, jsonRetorno: [] });
      }
    });
  };
  exports.getFesta = function(req, res) {
    var query = "SELECT * FROM pca_festas_config";
    query += " WHERE id_festa = " + req.body.id_festa;
    conn.query(query, function(error, result) {
      if (error) {
        console.dir(error);
      }
      if (result.length > 0) {
        res.json({ message: true, string: query, jsonRetorno: result });
      } else {
        res.json({ message: false, string: query, jsonRetorno: [] });
      }
    });
  };
  exports.getComboLotes = function(req, res) {
    var query = "SELECT lote value, valor label FROM pca_combo_lotes";
    query += " WHERE id_festa = " + req.body.id_festa;
    conn.query(query, function(error, result) {
      if (error) {
        console.dir(error);
      }
      if (result.length > 0) {
        res.json({ message: true, string: query, jsonRetorno: result });
      } else {
        res.json({ message: false, string: query, jsonRetorno: [] });
      }
    });
  };