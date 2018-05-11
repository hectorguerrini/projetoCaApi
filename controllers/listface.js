var request = require('request'),
zlib = require("zlib");
var bod = "ft_ent_identifier=1944764592521043&viewas&source=17&offset=25464&length=50&orderingmode=toplevel&section=default&direction=top&feed_context=%7B%22story_width%22%3A230%2C%22is_narrow%22%3Atrue%2C%22fbfeed_context%22%3Atrue%7D&numpagerclicks=1&av=100002953032019&ircid=b0e2d8b1-5f2d-4678-939a-d205d8debd7d&__user=100002953032019&__a=1&__dyn=7AgNe-4amaxx2u6aJGeFxqeCwDKFbGEW8x2C-C267UqGawIhE-58nwgU6Cu9UJu9wPG2OUG4XzEeUK3uczoboGq3C5-uifz8nxm1Dxa2m4o6e27Axa2m7WwuUcFVo7G2i6pHxC68nCxi2q15wRyUG58y5UGdwRxC4eby9o-Wx28xy789EOEyJ7x3x69wwZ7x-lxdxWimiaxa9wzzUiVEtyEgxi2WeGFUO2KdyV4aw&__req=1l&__be=1&__pc=PHASED%3ADEFAULT&__rev=3896282&fb_dtsg=AQGqsXfYZ5Oj%3AAQHCXWVNbaOy&jazoest=26581711131158810289905379106586581726788878678989779121&__spin_r=3896282&__spin_b=trunk&__spin_t=1525983842";

var options = {
    url:'https://www.facebook.com/ajax/ufi/comment_fetch.php?dpr=1',
    method: "POST",
    encoding:null,
    body:bod,
    headers:{
        "Origin":"https://www.facebook.com",
        "Content-Type":"application/x-www-form-urlencoded",
        "Referer":"https://www.facebook.com/caeemmaua/photos/gm.1944764592521043/1952213015093882",
        "Accept-Encoding":"gzip, deflate",
        "Accept":"*/*",
        "Accept-Language":"pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "X-DevTools-Emulate-Network-Conditions-Client-Ids":"7E5046659A0AE405B7CAA4477B8AD69B",
        "Cookie":"sb=5wfxWtq8iwWjY14DHpW0Fjl1; datr=czXyWsnDMxxDHRSm9Wzq4wvn; locale=pt_BR; c_user=100002953032019; xs=37%3AxmF56j_n2orSag%3A2%3A1525826241%3A5723%3A4917; pl=n; pnl_data2=eyJhIjoib25hZnRlcmxvYWQiLCJjIjoiWEV2ZW50c1Blcm1hbGlua0NvbnRyb2xsZXIiLCJiIjpmYWxzZSwiZCI6Ii9jYWVlbW1hdWEvcGhvdG9zL2dtLjE5NDQ3NjQ1OTI1MjEwNDMvMTk1MjIxMzAxNTA5Mzg4Mi8iLCJlIjpbXX0%3D; wd=1920x949; fr=0bJO7Tx9z63LDhWUa.AWX59Ab4plbOg8dJfzsWVhmKExk.Ba8Qfn.W0.Frx.0.0.Ba8kLB.AWXW9thB; presence=EDvF3EtimeF1525829057EuserFA21B02953032019A2EstateFDutF1525829057845CEchFDp_5f1B02953032019F55CC; act=1525829080963%2F24; sb=5wfxWtq8iwWjY14DHpW0Fjl1; datr=czXyWsnDMxxDHRSm9Wzq4wvn; locale=pt_BR; c_user=100002953032019; xs=37%3AxmF56j_n2orSag%3A2%3A1525826241%3A5723%3A4917; pl=n; fr=0bJO7Tx9z63LDhWUa.AWWBUNWWWZxS_s7oA2szrizkGvI.Ba8Qfn.W0.Frx.0.0.Ba9Kep.AWXYY4CD; wd=1440x769; presence=EDvF3EtimeF1525983851EuserFA21B02953032019A2EstateFDutF1525983851823CEchFDp_5f1B02953032019F2CC; act=1525983869486%2F4; pnl_data2=eyJhIjoib25hZnRlcmxvYWQiLCJjIjoiWEV2ZW50c1Blcm1hbGlua0NvbnRyb2xsZXIiLCJiIjpmYWxzZSwiZCI6Ii9jYWVlbW1hdWEvcGhvdG9zL2dtLjE5NDQ3NjQ1OTI1MjEwNDMvMTk1MjIxMzAxNTA5Mzg4Mi8iLCJlIjpbXX0%3D",
    }
}


var requestWithEncoding = function(options, callback) {
    var req = request.post(options);
  
    req.on('response', function(res) {
      var chunks = [];
      res.on('data', function(chunk) {
        chunks.push(chunk);
      });
      console.log(res.headers)
      res.on('end', function() {
        var buffer = Buffer.concat(chunks);
        var encoding = res.headers['content-encoding'];
        if (encoding == 'gzip') {
          zlib.gunzip(buffer, function(err, decoded) {
            callback(err, decoded && decoded.toString());
          });
        } else if (encoding == 'deflate') {
          zlib.inflate(buffer, function(err, decoded) {
            callback(err, decoded && decoded.toString());
          })
        } else {
          callback(null, buffer.toString());
        }
      });
    });
  
    req.on('error', function(err) {
      callback(err);
    });
  }
  requestWithEncoding(options, function(err, data) {
    if (err) console.log(err);
    //else console.log(JSON.parse(data.replace('for (;;);','')));
    else console.log(data);
  })
// request.post({
//     url:'https://www.facebook.com/ajax/ufi/comment_fetch.php?dpr=1',
//     method: "POST",
//     encoding:null,
//     body: bod,
//     headers:{
//         "Origin":"https://www.facebook.com",
//         "Content-Type":"application/x-www-form-urlencoded",
//         "Referer":"https://www.facebook.com/caeemmaua/photos/gm.1944764592521043/1952213015093882/?type=3&theater",
//         "Accept-Encoding":"gzip,deflate",
//         "Origin":"application/x-www-form-urlencoded",
//         "Accept":"application/json",
//         "Accept-Language":"pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
//         "X-DevTools-Emulate-Network-Conditions-Client-Ids":"5C0F3EDFA877BA631CC82583352A845F",
//         "User-Agents": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36",
//         "Cookie":"sb=5wfxWtq8iwWjY14DHpW0Fjl1; wd=1920x949; datr=czXyWsnDMxxDHRSm9Wzq4wvn; locale=pt_BR; c_user=100002953032019; xs=37%3AxmF56j_n2orSag%3A2%3A1525826241%3A5723%3A4917; fr=0bJO7Tx9z63LDhWUa.AWX59Ab4plbOg8dJfzsWVhmKExk.Ba8Qfn.W0.Frx.0.0.Ba8kLB.AWXW9thB; pl=n; pnl_data2=eyJhIjoib25hZnRlcmxvYWQiLCJjIjoiWEV2ZW50c1Blcm1hbGlua0NvbnRyb2xsZXIiLCJiIjpmYWxzZSwiZCI6Ii9jYWVlbW1hdWEvcGhvdG9zL2dtLjE5NDQ3NjQ1OTI1MjEwNDMvMTk1MjIxMzAxNTA5Mzg4Mi8iLCJlIjpbXX0%3D; presence=EDvF3EtimeF1525828722EuserFA21B02953032019A2EstateFDutF1525828722180CEchFDp_5f1B02953032019F36CC; act=1525828774716%2F22; sb=5wfxWtq8iwWjY14DHpW0Fjl1; wd=1920x949; datr=czXyWsnDMxxDHRSm9Wzq4wvn; locale=pt_BR; c_user=100002953032019; xs=37%3AxmF56j_n2orSag%3A2%3A1525826241%3A5723%3A4917; fr=0bJO7Tx9z63LDhWUa.AWX59Ab4plbOg8dJfzsWVhmKExk.Ba8Qfn.W0.Frx.0.0.Ba8kLB.AWXW9thB; pl=n; presence=EDvF3EtimeF1525829057EuserFA21B02953032019A2EstateFDutF1525829057845CEchFDp_5f1B02953032019F55CC; act=1525829080963%2F24; pnl_data2=eyJhIjoib25hZnRlcmxvYWQiLCJjIjoiWEV2ZW50c1Blcm1hbGlua0NvbnRyb2xsZXIiLCJiIjpmYWxzZSwiZCI6Ii9jYWVlbW1hdWEvcGhvdG9zL2dtLjE5NDQ3NjQ1OTI1MjEwNDMvMTk1MjIxMzAxNTA5Mzg4Mi8iLCJlIjpbXX0%3D",
//     }
// },function (error, response, body) {
        
//         console.log(response.statusCode)
//         if (!error && response.statusCode == 200) {
//             console.log(response.headers)
//             console.log(response.body)

//             var gunzip = zlib.createGunzip();
//             response.pipe(gunzip);
            
//             gunzip.on('data', function (data) {
//                 // decompression chunk ready, add it to the buffer
//                 buffer.push(data.toString());

//             }).on("end", function () {
//                 // response and decompression complete, join the buffer and return
//                 callback(null, buffer.join(""));

//             }).on("error", function (e) {
//                 callback(e);
//             });
            
            
            
           
           
            
//         }
//     }
// );




