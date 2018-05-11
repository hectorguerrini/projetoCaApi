var fs = require('fs'); // require newman in your project


   global.nomes ='';
   var array =[]
    for (var j = 3; j < 6;j++ ) {
      var nome = "controllers/response" + j;
      array.push(nome)
    }

    array.forEach(function(dir,index){
      var contents = fs.readFileSync(dir, "utf-8");
     
      var response = JSON.parse(contents.replace("for (;;);", ""));

      for (var i = 0; i < 50; i++) {
        global.nomes = global.nomes + "<tr><td>" + response.jsmods.require[0][3][1].comments[i].author_name + "</td></tr>";
      }
        
      if (index == array.length-1) {
        geraExcel();
      }
    })
    
    function geraExcel() {
      var html = "<?xml version='1.0' encoding='UTF-8'?>";
      //html = html+"<table>" + global.nomes + "</table>";
     html = html + "<Workbook><Worksheet><Table><Column ss:Index='1' ss:AutoFitWidth='0' ss:Width='110'/><Row><Cell><Data ss:Type='String'>ID</Data></Cell></Row><Row><Cell><Data ss:Type='String'></Data></Cell></Row></Table></Worksheet></Workbook>";
      console.log(html);
      fs.writeFile("NomesSorteio.xlsx", html,'utf8', err => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    }
    





