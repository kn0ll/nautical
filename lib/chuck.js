var spawn = require('child_process').spawn,
    file_system = require('fs'),
    chuck_babies = {}

exports.play = function(path) {
    chuck_babies[path] = spawn('chuck', [path])
}

exports.stop = function(path) {
    var baby = chuck_babies[path]
    if(baby) {
        baby.kill()
        delete chuck_babies[path]
    }
}