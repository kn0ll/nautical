$(function() {
   
    window.Shred = Backbone.Model.extend({
      
        name: null,
        content: null,
        view: null,
        path: null,

        initialize: function(data) {
            
            var model = this
            
            this.view = new Shred_View({
                model: model
            }).render()
            
            // if they pass path in
            // we load it
            if(data.path)
                Socket.send({
                    method: 'shred::open',
                    data: model
                })

        },
        
        load: function() {
            var model = this.model
            Socket.send({
                method: 'shred::open',
                data: model
            })
        },
      
    })
   
})