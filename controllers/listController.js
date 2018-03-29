
var moment = require('moment');
moment.locale('pt-br');
var mysql      = require('mysql');
var conn =  mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'projetoca',
    database : 'pca'
  
});

conn.connect(function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + conn.threadId);
});

exports.listar = function (req, res) {
    var query = "SELECT id_aluno,nome,registro FROM pca_ca_master";
    query+= " WHERE registro = '"+req.body.usuario+"'AND senha = '"+req.body.senha+"'";
    conn.query(query,function(error,result){
        if(error){
            console.dir(error)
        }
        if(result.length>0){
            res.json({message:true,string:query,jsonRetorno:result})
        }else{
            res.json({message:false,string:query,jsonRetorno:[]})
        }
        
    })
 
};

exports.detalhes = function (req, res) {
    var query = "SELECT id_aluno,nome FROM pca_base_alunos";
    query+= " WHERE registro = '"+req.body.registro+"'";
    conn.query(query,function(error,result){
        if(error){
            console.dir(error)
        }
        if(result.length>0){
            res.json({message:true,string:query,jsonRetorno:result})
        }else{
            res.json({message:false,string:query,jsonRetorno:[]})
        }
    })
};
exports.updateVenda = function (req, res) {
    var query = "SELECT id_venda,data_venda FROM pca_festa_venda_aluno ";
    query+= "WHERE id_aluno = "+req.body.id_aluno+" AND id_festa = 1";
    conn.query(query,function(error,result){
        if(error){
            console.dir(error)
        }
        
        if(result.length>0){
            result[0].data_venda = moment(result[0].data_venda).format('LLL')

            res.json({message:false,string:query,jsonRetorno:result})
        }else{
            var query2 = "INSERT INTO pca_festa_venda_aluno (id_aluno,id_vendedor,valor,sexo,flag_alimento,data_venda,id_festa) VALUES ";
            query2+= "("+req.body.id_aluno+","+req.body.id_vendedor+","+req.body.valor+",'"+req.body.sexo+"',"+req.body.flag_alimento+",now(),"+"1)";
            conn.query(query2,function(error,result){
                if(error){
                    console.dir(error)
                }
                
                if(result.affectedRows>0){
                    res.json({message:true,string:query2,jsonRetorno:result})
                }else{
                    res.json({message:false,string:query2,jsonRetorno:[]})
                }
            })
        }
    })
};

exports.log = function (req, res) {
    sql.connect(config, function (err) {
        var request = new sql.Request()
            .input('ESTANDE',sql.Int,req.body.estande)
            .input('EMAIL',sql.VarChar(100),req.body.email)
            .input('ACTION',sql.VarChar(15),req.body.action)
            .execute('sp_log', (err,result)=>{
                if(err){
                    console.dir(err)
                }
                if (result.rowsAffected > 0) {
                    res.json({
                        status: true,
                        message: "Sucesso"
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Error"
                    })
                }
                sql.close()
            })
    })
};
exports.listMap = function (req, res) {
    sql.connect(config, function (err) {
        var request = new sql.Request()
            .query('SELECT titulo,estande FROM tbl_01_trabalhos ORDER BY titulo ASC', (err, result) => {
                if (err) {
                    console.dir(err)
                }

                res.json(result.recordset)
                sql.close()
            })
    })


}
