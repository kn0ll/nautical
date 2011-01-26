var spawn = require('child_process').spawn,
    file_system = require('fs'),
    baby

// accepts an array of paths
exports.play = function(paths) {
    baby = spawn('chuck', paths)
}

exports.stop = function() {
    if(baby)
        baby.kill()
}