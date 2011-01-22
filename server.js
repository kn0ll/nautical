var Connect = require('connect'),
    Jade = require('jade'),
    Socket = require('socket.io-connect').socketIO,
    Chuck = require('./lib/chuck'),
    Fs = require('fs')

var server = Connect.createServer(
    
    Socket(function() { return server }, function (client, req, res) {
        
        client.on('message', function(data) {
            
            var d = JSON.parse(data),
                shred = d.data
            
            if(d.method == 'shred::play')
                Chuck.play(shred.path)
            
            else if(d.method == 'shred::stop')
                Chuck.stop(shred.path)
            
            else if(d.method == 'shred::save') {
                console.log(shred)
                Fs.writeFile(shred.path, shred.contents? shred.contents: '', function() {
                    client.send(JSON.stringify({
                        method: 'Shreds.update',
                        data: {
                            path: shred.path,
                            contents: shred.contents
                        }
                    })) 
                });
            
            } else if(d.method == 'shred::open') {
                console.log(shred)
                Fs.readFile(shred.path, 'utf8', function (err, shred_contents) {
                    client.send(JSON.stringify({
                        method: 'Shreds.update',
                        data: {
                            path: shred.path,
                            contents: shred_contents
                        }
                    }))
                })
            }
            
        })
        
    }),
    
    Connect.staticProvider(__dirname + '/static'),
    
    Connect.router(function(app){
        
        app.get('/', function(req, res, next){
            res.writeHead(200, { 'Content-Type': 'text/html' })
            Jade.renderFile('./views/index.jade', { locals: req.params }, function(err, html) {
                res.end(html)
            })
        })
        
    })
    
).listen(8080)