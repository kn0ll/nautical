var Connect = require('./lib/connect/lib/connect'),
    Jade = require('./lib/jade/lib/jade'),
    Socket = require('./lib/Socket.IO-connect/socketIO').socketIO,
    Chuck = require('./lib/chuck');

var server = Connect.createServer(
    
    Socket(function() { return server; }, function (client, req, res) {
        
        client.on('message', function(data) {
            
            var d = JSON.parse(data);
            
            if(d.method == 'shred::play') {
                Chuck.play('/Users/Nic/Desktop/lol.ck', d.data.content);
            }
            
            else if(d.method == 'shred::stop') {
                Chuck.stop();
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