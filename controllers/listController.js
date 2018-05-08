var ExcelExport = require("excel-export-es6")
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
    console.log(result)
    if (result.length > 0) {
      res.json({ message: true, string: query, jsonRetorno: result });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};

exports.detalhes = function(req, res) {
  var query = "SELECT id_venda,data_venda FROM pca_festa_venda_aluno AS venda ";
  query += " INNER JOIN pca_base_alunos AS alunos ON alunos.id_aluno = venda.id_aluno "
  query += " WHERE alunos.registro = '" + req.body.registro + "' AND venda.id_festa = "+req.body.id_festa+"";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
    
    if (result.length > 0) {
      result[0].data_venda = moment(result[0].data_venda).format("LLL");

      res.json({ message: false, string: query, jsonRetorno: result });
    } else {
      var query2 = "SELECT id_aluno,nome FROM pca_base_alunos";
      query2 += " WHERE registro = '" + req.body.registro + "'";
      conn.query(query2, function(error, result) {
        if (error) {
          console.dir(error);
        }

        if (result.length > 0) {
          res.json({ message: true, string: query2, jsonRetorno: result });
        } else {
          res.json({ message: false, string: query2, jsonRetorno: [] });
        }
      });
    }
  });


};
exports.detalhesConvidado = function(req, res) {
  var query = "SELECT id_venda,data_venda FROM pca_festa_venda_convidado ";
  query += " WHERE cpf = '" + req.body.cpf + "' AND id_festa = 1";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
    
    if (false) {
      result[0].data_venda = moment(result[0].data_venda).format("LLL");

      res.json({ message: true, string: query, jsonRetorno: result });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });


};
exports.updateVenda = function(req, res) {
  var query = "SELECT id_venda,data_venda FROM pca_festa_venda_aluno ";
  query += "WHERE id_aluno = " + req.body.id_aluno + " AND id_festa = "+req.body.id_festa+"";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }

    if (result.length > 0) {
      result[0].data_venda = moment(result[0].data_venda).format("LLL");

      res.json({ message: false, string: query, jsonRetorno: result });
    } else {
      var query2 =
        "INSERT INTO pca_festa_venda_aluno (id_aluno,id_vendedor,valor,sexo,alimento,data_venda,id_festa,lote) VALUES ";
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
        req.body.id_festa +
        "," +
        req.body.lote +
        ")";
        
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
exports.updateVendaConvidado = function(req, res) {
  var query = "SELECT id_venda,data_venda FROM pca_festa_venda_convidado ";
  query += "WHERE cpf = '" + req.body.cpf + "' AND id_festa = 1";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }

    if (false) {
      result[0].data_venda = moment(result[0].data_venda).format("LLL");

      res.json({ message: false, string: query, jsonRetorno: result });
    } else {
      var query2 =
        "INSERT INTO pca_festa_venda_convidado (nome,cpf,id_vendedor,valor,sexo,alimento,data_venda,id_festa,lote) VALUES ";
      query2 +=
        "('" +
        req.body.nome +
        "','" +
        req.body.cpf +
        "'," +
        req.body.id_vendedor +
        "," +
        req.body.valor +
        ",'" +
        req.body.sexo +
        "'," +
        req.body.flag_alimento +
        ",now()" +
        ",1," +
        req.body.lote +
        ")";
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
    "INSERT INTO pca_festas_config (nome,lote_ativo,flag_alimento,flag_sexo,flag_camarote) VALUES ";
  query +=
    "('" +
    req.body.nome +
    "'," +
    req.body.lote +
    "," +
    req.body.flag_alimento +
    "," +
    req.body.flag_sexo +
    "," +
    req.body.flag_camarote +
    ")";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
    var lotesNormal = JSON.parse(req.body.lotesNormal);
    var lotesEspecial = req.body.flag_camarote ?JSON.parse(req.body.lotesEspecial):[];
    if (result.affectedRows > 0) {
        for(var i = 0; i<lotesNormal.length;i++){
            updateComboFesta(result.insertId,lotesNormal[i],'pista');
        }
        if(req.body.flag_camarote){
          for(var i = 0; i<lotesEspecial.length;i++){
            updateComboFesta(result.insertId,lotesEspecial[i],'camarote');
          }
        }
        res.json({ message: true, string: query, jsonRetorno: result });
    } else {
        res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};
    function updateComboFesta(id_festa,params,label){
        console.dir(params)
    var query =
      "INSERT INTO pca_combo_lotes (id_festa,lote,valor,label,tipo) VALUES ";
    query +=
      "(" +
      id_festa +
      "," +
      params.value +
      "," +
      params.label.replace("R$ ","") +
      ",'" +
      label +
      "','" +
      params.tipo +
      "');";
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
    var query = "SELECT * FROM pca_festas_config WHERE id_festa = (SELECT MAX(id_festa) from pca_festas_config);";
    //query += " WHERE id_festa = " + req.body.id_festa;
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
    var query = "SELECT lote value, valor label,label tipo,tipo aluno FROM pca_combo_lotes ";
    query += " WHERE id_festa = " + req.body.id_festa+" order by tipo,label";
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


  



  exports.gerarExcel = function(req, res) {
    var query = "select *,case when (alimento = 1 and (valor=45 or valor=60)) or (alimento = 0 and (valor =50 or valor = 65)) then '1 lote'";
      query+= " when (alimento = 1 and (valor=50 or valor=70)) or (alimento = 0 and (valor =55 or valor = 75)) then '2 lote'";
      query+= " when (alimento = 1 and (valor=55 or valor=80)) or (alimento = 0 and (valor =60 or valor = 85)) then '3 lote' else ' ' end as lote ";
      query+=" from (select 'Aluno' tipo ,id_venda,id_vendedor,valor,alimento,sexo,DATE_FORMAT(data_venda, '%d/%m/%Y') data from pca_festa_venda_aluno ";
      query += " union all select 'Convidado' tipo, id_venda,id_vendedor,valor,alimento,sexo,DATE_FORMAT(data_venda, '%d/%m/%Y') data from pca_festa_venda_convidado )a";
    conn.query(query, function(error, result) {
      if (error) {
        console.dir(error);
      }
      if (result.length > 0) {
        excel(result,res);
        
      } else {
        res.json({ message: false, string: query, caminho: '' });
      }
    });
  };
  function excel(result,res){
    var rowsTotal =[];
    var caminho ="";
    result.forEach(element => {
      var row=[];
      row.push(element.tipo)
      row.push(element.id_venda)
      row.push(element.id_vendedor)
      row.push(element.valor)
      row.push(element.alimento)
      row.push(element.sexo)
      row.push(element.data)
      row.push(element.lote)
      rowsTotal.push(row);
    });
    let configuration = {
    cols: [{
      caption: 'Tipo',
      type: 'string'
    }, {
      caption: 'id_venda',
      type: 'number'
    }, {
      caption: 'id_vendedor',
      type: 'number'
    }, {
      caption: 'valor',
      type: 'number'
    }, {
      caption: 'alimento',
      type: 'number'
    }, {
      caption: 'sexo',
      type: 'string'
    }, {
      caption: 'data',
      type: 'date'
    },{
      caption: 'lotes',
      type: 'string'
    }
  ], // Array that defines each columns
      rows: rowsTotal, // Data to be written
      name: "Vendas"
  };
  
  ExcelExport.execute(configuration,function(err, path) {
    console.log("Path to excel file", path);
    res.json({ message: true, caminho: path});
    });

}
