var Socket = (function() {
    
    var socket = new io.Socket();

    socket.connect();

    socket.on('message', function(e) {
        e = $.parseJSON(e);
        // this will return the object
        // based on it's string: ie obj.prop.method
        // returns that object
        // @todo probably not secure :]
        (function getMethodRecursive(obj, arr) {
            if(!arr || !arr.length) {
                return obj;
            } else {
                obj = obj[arr.shift()];
                return getMethodRecursive(obj, arr);
            }        
        })(window, e.method.split('.'))
        (e.data);
    });
    
    return {
        
        send: function(obj) {
            socket.send(JSON.stringify(obj));
        }
        
    }

})();