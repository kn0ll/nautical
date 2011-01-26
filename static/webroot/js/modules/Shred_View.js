$(function() {
  
    window.Shred_View = Backbone.View.extend({
        
        el: null,
        
        template_html: $('script#shred-view').html(),
        
        events: {
            'submit .save-shred': 'save',
            'click .save': 'save',
            'click .play': 'play',
            'click .stop': 'stop',
            'keyup .content': 'edit'
        },
        
        initialize: function() {
            var tmp = $(Mustache.to_html(this.template_html, this.model.attributes))
            // proxy title to parent node we create
            $(this.el).html(tmp).attr('title', tmp.attr('title'))
            this.model.bind('change:path', this.change.path)
            this.model.bind('change:contents', this.change.contents)
        },
        
        save: function() {
            var $save_form = $('form.save-shred', $(this.el)),
                model = this.model,
                path = model.path || $('input', $save_form).val()
            if(!path) { 
                $save_form.show()
            } else {
                if(!model.path)
                    model.set({ path: path })
                $save_form.hide()
                Socket.send({
                    method: 'shred::save',
                    data: [model]
                })
            }
            return false
        },
        
        play: function() {
            var model = this.model
            Socket.send({
                method: 'shred::play',
                data: [model]
            })
        },
        
        stop: function() {
            var model = this.model
            Socket.send({
                method: 'shred::stop'
            })
        },
        
        // @todo: not efficient on every keyup
        edit: function() {
            var node = this.el
            this.model.set({contents: $('.content', node).val()})
        },
        
        render: function() {
            $('body').append(this.el)
            $(this.el).dialog({ resizable: false })
            return this
        },
        
        // these change methods
        // get the "this" context of a model
        // but i put it here for modularitys sake
        
        change: {
            
            path: function(model, path) {
                $(this.view.el).dialog('option', 'title', path)
            },
            
            contents: function(model, contents) {
                $('.code textarea', $(this.view.el)).val(contents)
            }
            
        }
        
    })
  
})