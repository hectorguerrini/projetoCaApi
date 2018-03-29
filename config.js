var mysql      = require('mysql');
const config =  mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'projetoca',
    database : 'pca'
  
});

module.exports = config;