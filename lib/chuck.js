var spawn = require('child_process').spawn,
    file_system = require('fs'),
    chuck_babies = [];

exports.play = function(path) {
    chuck_babies.push(spawn('chuck', [path]))
}

exports.stop = function() {
    var baby = chuck_babies.pop();
    if(baby) {
        baby.kill();
    }
}