var config = require('../config')
var moment = require("moment");
var sql = require('mssql')
moment.locale("pt-br");

sql.connect(config,function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  } 
  console.log("connected ");
});


exports.home = function (req, res) {
    res.send('Api Work');
};


exports.listar = function(req, res) {
  var usuario = req.body.usuario ? req.body.usuario:''; 
  var senha = req.body.senha ? req.body.senha:'';

  var query = "SELECT id,nome,registro FROM pca_ca_master";
  query +=
    " WHERE registro = '" + usuario + "'"
    " AND senha = '" + senha + "'";

  var conn = new sql.Request();
  conn.query(query, function(error, result) {
    if (error) { console.dir(error); }

    if (result.recordset.length > 0) {
      res.json({ message: true, string: query, jsonRetorno: result.recordset });
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });

};

exports.detalhes = function(req, res) {
  var query = " EXEC sp_pca_get_aluno ";
    query += " @REGISTRO='" + req.body.registro + "'";
    query += " ,@ID_FESTA= " + req.body.id_festa + "";

  
  var conn = new sql.Request();
  console.log(query)
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
    
    if (result.recordset.length > 0) {
      if(result.recordset[0].data_venda){
        result.recordset[0].data_venda = moment(result.recordset[0].data_venda).format("LLL");

        res.json({ message: false, string: query, jsonRetorno: result.recordset });
      }else{
        res.json({ message: true, string: query, jsonRetorno: result.recordset });
      }      
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });

};
exports.updateVenda = function(req, res) {
  
  var query = " EXEC sp_pca_update_venda_aluno "; 
  query +=" @ID_ALUNO="+req.body.id_aluno +"";
  query +=" ,@ID_VENDEDOR="+req.body.id_vendedor +"";
  query +=" ,@VALOR="+req.body.valor +"";
  query +=" ,@SEXO='"+req.body.sexo +"'";
  query +=" ,@ALIMENTO="+req.body.flag_alimento +"";
  query +=" ,@ID_FESTA="+req.body.id_festa +"";
  query +=" ,@LOTE="+req.body.lote +"";

  var conn = new sql.Request();
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }

    if (result.recordset.length > 0) {
      if(result.recordset[0].data_venda){
        result.recordset[0].data_venda = moment(result.recordset[0].data_venda).format("LLL");

        res.json({ message: false, string: query, jsonRetorno: result.recordset });
      }else{
        res.json({ message: true, string: query, jsonRetorno: result.recordset });
      }
    } else {
      res.json({ message: false, string: query, jsonRetorno: [] });
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

exports.updateVendaConvidado = function(req, res) {
  var query = "SELECT id_venda,data_venda FROM pca_festa_venda_convidado ";
  query += "WHERE cpf = '" + req.body.cpf + "' AND id_festa = 1";
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }

    if (false) {
      result.recordset[0].data_venda = moment(result.recordset[0].data_venda).format("LLL");

      res.json({ message: false, string: query, jsonRetorno: result.recordset });
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
        ",now()," +
        req.body.id_festa +
        "," +
        req.body.lote +
        ")";
      conn.query(query2, function(error, result) {
        if (error) {
          console.dir(error);
        }

        if (result.recordset.affectedRows > 0) {
          res.json({ message: true, string: query2, jsonRetorno: result.recordset });
        } else {
          res.json({ message: false, string: query2, jsonRetorno: [] });
        }
      });
    }
  });
};
exports.updateFesta = function(req, res) {
  var nome = req.body.nome ? req.body.nome : '';
  var alimento = req.body.flag_alimento ? parseInt(req.body.flag_alimento) : 0;
  var sexo = req.body.flag_sexo ? parseInt(req.body.flag_sexo) : 0;
  var camarote = req.body.flag_camarote ? parseInt(req.body.flag_camarote): 0;

  
  var query = " EXEC sp_pca_update_festa ";
  query += " @NOME='"+nome+"'"; 
  query += " ,@ALIMENTO="+alimento+""; 
  query += " ,@SEXO="+sexo+""; 
  query += " ,@CAMAROTE="+camarote+""; 
  var conn = new sql.Request();
  conn.query(query, function(error, result) {
    if (error) {
      console.dir(error);
    }
  
    var lotesNormal = JSON.parse(req.body.lotesNormal);
    var lotesEspecial = camarote ?JSON.parse(req.body.lotesEspecial):[];

    if (result.recordset.length > 0) {
        for(var i = 0; i<lotesNormal.length;i++){
            updateComboFesta(result.recordset[0].id_festa,lotesNormal[i],'pista');
        }
        if(camarote){
          for(var i = 0; i<lotesEspecial.length;i++){
            updateComboFesta(result.recordset[0].id_festa,lotesEspecial[i],'camarote');
          }
        }
        res.json({ message: true, string: query, jsonRetorno: result.recordset });
    } else {
        res.json({ message: false, string: query, jsonRetorno: [] });
    }
  });
};
    


function updateComboFesta(id_festa,params,label){
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
    var conn = new sql.Request();
    conn.query(query, function(error, result) {
      if (error) {
        console.dir(error);
      }
    });
};


exports.getListaFestas = function(req, res) {
    var query = "SELECT * FROM pca_festas_config";
    var conn  = new sql.Request();
    conn.query(query, function(error, result) {
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
  exports.getFesta = function(req, res) {
    var query = "SELECT TOP 1 * FROM pca_festas_config ORDER BY id_festa DESC";
    var conn = new sql.Request();
    conn.query(query, function(error, result) {
      if (error) {
        console.dir(error);
      }
      console.log(result)
      if (result.recordset.length > 0) {
        res.json({ message: true, string: query, jsonRetorno: result.recordset });
      } else {
        res.json({ message: false, string: query, jsonRetorno: [] });
      }
    });
  };
  exports.getComboLotes = function(req, res) {
    var query = "EXEC sp_pca_get_lote @ID="+req.body.id_festa+"";
    var conn = new sql.Request()
    conn.query(query, function(error, result) {
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
      if (result.recordset.length > 0) {
        res.json({ message: true, string: query, jsonRetorno: result.recordset });
        
        
      } else {
        res.json({ message: false, string: query, caminho: '' });
      }
    });
  };




