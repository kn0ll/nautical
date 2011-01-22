var Socket = (function() {
    
    var socket = new io.Socket();

    socket.connect();
    
    function getMethodRecursive(obj, arr) {
        if(!arr || !arr.length) {
            return obj;
        } else {
            obj = obj[arr.shift()];
            return getMethodRecursive(obj, arr);
        }        
    }

    socket.on('message', function(e) {
        e = $.parseJSON(e);
        getMethodRecursive(window, e.method.split('.'))(e.data);
    });
    
    return {
        
        send: function(obj) {
            socket.send(JSON.stringify(obj));
        }
        
    }

})();