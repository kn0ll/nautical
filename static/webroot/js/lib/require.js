var Require = (function() {

    var cache = {},
        queue = [];

    $(function() {
        // builds cache from non-dynamic scripts
        // note: that means this needs to be included
        //       before you call it (naturally),
        //       so the cache is built first
        $('script[type="text/javascript"]').each(function() {
            cache[$(this).attr('src')] = true
        });
    });

    // loads a script if it's not yet been loaded
    // based on a dynamic condition if provided
    function require(script, callback) {
        
        // if the script hasn't been loaded yet
        if(!cache[script]) {
            cache[script] = true;
            // getScript we can cache
            $.ajax({
                url: script,
                dataType: 'script',
                cache: true,
                success: function() {
                    if(queue.length)
                        require(queue.shift(), callback)
                    else if(callback)
                        callback()
                }
            });
        }
        
    }
    
    return {
        
        load: function(scripts, callback) {
            
            // if there's a queue, we're loading js
            // at the time
            var loading = queue.length
        
            // create queue
            for(var i in scripts)
                queue.push(scripts[i])
            
            // if there's a queue and no modules
            // are currently loading, start queue
            if(queue.length && !loading)
                require(queue.shift(), callback)
        
        }
        
    }

})();