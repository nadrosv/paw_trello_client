var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('boards.json')
var middlewares = jsonServer.defaults()
var fs = require('fs'),
    formidable = require('formidable'),
    util = require('util'),
    fs = require('fs-extra')
    //qt = require('quickthumb')


server.use(middlewares)

server.use(jsonServer.bodyParser)

// Post files
// server.use(qt.static(__dirname + '/'));

server.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // res.writeHead(200, { 'content-type': 'text/plain' });
        // res.write('received upload:\n\n');
        // next();
        // res.end();
    });

    form.on('end', function (fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'uploads/';

        fs.copy(temp_path, new_location + file_name, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
                server.post('/files', function (req, res) {
                    
                })
            }
        });
    });
});

// Show the upload form 


server.use(router)


server.listen(3000, function () {
    console.log('JSON Server is running')
})