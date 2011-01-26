var Connect = require('connect'),
    Jade = require('jade'),
    Socket = require('socket.io-connect').socketIO,
    Chuck = require('./lib/chuck'),
    Fs = require('fs')

var server = Connect.createServer(
    
    Socket(function() { return server }, function (client, req, res) {
        
        client.on('message', function(data) {
            
            var d = JSON.parse(data),
                msg = d.data
            
            // shred::play accepts an
            // array of shreds to be played
            if(d.method == 'shred::play') {
                var to_play = [];
                // build an array of path names
                // from the given shreds
                for(var i in msg)
                    to_play.push(msg[i].path)
                Chuck.play(to_play)
            
            // stop all playing shreds
            } else if(d.method == 'shred::stop')
                // stop playback
                Chuck.stop()
            
            // shred::save accepts an
            // array of shreds to be saved
            else if(d.method == 'shred::save')
                // for each shred
                for(var i in msg)
                    // write the shred to a file
                    Fs.writeFile(msg[i].path, msg[i].contents? msg[i].contents: '')
            
            // shred::save accepts an
            // array of shreds to be saved
            else if(d.method == 'shred::open') {
                // for each shred
                for(var i in msg)
                    // read the file
                    Fs.readFile(msg[i].path, 'utf8', function (err, shred_contents) {
                        // update the model and tell the client
                        msg[i].contents = shred_contents
                        client.send(JSON.stringify({
                            method: 'Shreds.update',
                            data: msg[i]
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