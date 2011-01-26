$(function() {
   
    window.Shred = Backbone.Model.extend({
        
        id: null,
        name: null,
        content: null,
        view: null,
        path: null,

        initialize: function(data) {
            
            var model = this
            
            this.view = new Shred_View({
                model: model
            }).render()
            
            // add to the playlist view
            Playlist.add(model)
            
            // if they pass path in
            // we load it
            if(data.path)
                this.load()

        },
        
        load: function() {
            var model = this
            Socket.send({
                method: 'shred::open',
                data: [model]
            })
        }
      
    })
   
})