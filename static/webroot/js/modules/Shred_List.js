$(function() {
   
    window.Shred_List = Backbone.Collection.extend({
      
        model: Shred,
        
        update: function(shred) {
            Shreds.map(function(map_shred) {
                if(map_shred.get('path') == shred.path)
                    return map_shred
            }).forEach(function(cur_shred) {
                // todo: for some reason the above map
                // returns undefined instead of
                // not returning mapped objects
                // so we check here. should fix
                if(cur_shred)
                    cur_shred.set({ contents: shred.contents })
            });
        }

    })
   
})