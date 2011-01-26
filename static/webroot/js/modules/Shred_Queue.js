$(function() {
    
    // keep track of rows in the
    // queue <table> by model cid
    var rows = {};
   
    window.Shred_Queue = Backbone.View.extend({
      
        el: $('#shred-queue'),
        table: $('tbody', $('#shred-queue')),
        
        events: {
            'click .play-all': 'play',
            'click .stop': 'stop'
        },
        
        add: function(shred) {
            var cid = shred.cid,
                path = shred.get('path'),
                row = $('<tr><td><input type="checkbox" /></td><td class="name">' + path + '</td></tr>');
            if(!rows[cid]) {
                rows[cid] = row;
                this.table.append(row);
            }
            shred.bind('change:path', this.change.path)
        },
        
        initialize: function() { 
            this.el.dialog({
               closeOnEscape: false,
               resizable: false,
               open: function() { $('.ui-dialog-titlebar-close', $(this).parent()).hide(); }
            })
        },
        
        play: function() {
            var to_play = [];
            for(var i in rows)
                // if they checked this row
                if($('input', rows[i]).is(':checked'))
                    // add shred by model id to play array
                    to_play.push(Shreds.detect(function(shred) {
                        return shred.cid = i;
                    }));
            Socket.send({
                method: 'shred::play',
                data: to_play
            });
        },
        
        stop: function() {
            Socket.send({
                method: 'shred::stop'
            })
        },
        
        change: {
            
            path: function(model, path) {
                $('.name', rows[model.cid]).text(model.get('path'));
            }
            
        }

    })
   
})