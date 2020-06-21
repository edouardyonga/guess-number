
var http = require('http');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var qs = require('querystring');


let username = '';
let password = '';	

// connect DB
var con = mysql.createConnection({
  host: "localhost",
  user: "edouard",
  password: "",
  database: "game"
});

function create_user(user_name,user_pwd) {
	con.connect(function(err) {
	  // if (err) throw err;
	  console.log("Connected!");
	  // let usr = username;
	  // let pwd = password;

	  console.log('In db:');
	  console.log(user_name);
	  console.log(user_pwd);

	  var sql = "INSERT INTO user (username, password) VALUES ('"+user_name+"','"+user_pwd+"')";
	  con.query(sql, function (err, result) {
	    // if (err) throw err;
	    console.log("Query status: 200");
	  });

	});
}


http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    // if (filePath == './') {
    //     filePath = './register.html';
    // }

    // Take POST request
    if (request.method == 'POST') {
        var body = '';
         var user = '';

        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
        	user = qs.parse(body);
        	console.log('repetition...');

        	username = user.username;
    		password = user.password;
            filePath = './index.html';
            response.redirect('/index.html');
    		if (username != '') {
	    		create_user(username,password);
	    	}
            console.log(user);
            console.log(user.username);
            console.log("filePath: ");
            console.log(filePath);
            // console.log(user.password);
        });	
    }

    console.log("here...");
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

