var child_process = require('child_process'),
    file_system = require('fs'),
    child;

exports.play = function(path, content) {
    file_system.writeFile(path, content, function(err) {
        if(err) {
            console.log(err);
        } else {
            child = child_process.exec(['chuck', path].join(' '));
        }
    });
}

exports.stop = function() {
    child.kill();
}