var Connect = require('connect'),
    Jade = require('jade'),
    Socket = require('socket.io-connect').socketIO,
    Chuck = require('./lib/chuck'),
    Fs = require('fs');

var server = Connect.createServer(
    
    Socket(function() { return server; }, function (client, req, res) {
        
        client.on('message', function(data) {
            
            var d = JSON.parse(data);
            
            if(d.method == 'shred::play') {
                Chuck.play(d.data.path);
            }
            
            else if(d.method == 'shred::stop') {
                Chuck.stop();
            }
            
            else if(d.method == 'shred::save') {
                Fs.writeFile(d.data.path, d.data.content);
            }
            
        });
        
    }),
    
    Connect.staticProvider(__dirname + '/static'),
    
    Connect.router(function(app){
        
        app.get('/', function(req, res, next){
            res.writeHead(200, { 'Content-Type': 'text/html' });
            Jade.renderFile('./views/index.jade', { locals: req.params }, function(err, html) {
                res.end(html);
            });
        });
        
    })
    
).listen(8080);