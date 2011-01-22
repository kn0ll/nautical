$(function() {
  
    window.FileMenu = Backbone.View.extend({
        
        el: $('ul#menu'),
        $shred_open_form: $($('script#open-shred').html()),
        
        events: {
          'click .create': 'create',
          'click .open': 'open'
        },
        
        create: function() {
            Shreds.add();
        },
        
        open: function() {
            this.$shred_open_form.dialog({
                resizable: false
            });
        }
        
    });
  
});

$(function() {
  
    window.ShredView = Backbone.View.extend({
        
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
            var tmp = $(Mustache.to_html(this.template_html, this.model.attributes));
            // proxy title to parent node we create
            $(this.el).html(tmp).attr('title', tmp.attr('title'));
            this.model.bind('change:path', this.change.path);
        },
        
        save: function() {
            var $save_form = $('form.save-shred', $(this.el)),
                path = $('input', $save_form).val(),
                model = this.model;
            if(!path) { 
                $save_form.show();
            } else {
                model.set({ path: path });
                $save_form.hide();
                Socket.send({
                    method: 'shred::save',
                    data: model
                })
            }
            return false;
        },
        
        play: function() {
            var model = this.model;
            Socket.send({
                method: 'shred::play',
                data: model
            });
        },
        
        stop: function() {
            Socket.send({
                method: 'shred::stop'
            });
        },
        
        // @todo: not efficient on every keyup
        edit: function() {
            var node = this.el;
            this.model.set({content: $('.content', node).val()});
        },
        
        render: function() {
            $('body').append(this.el);
            $(this.el).dialog({ resizable: false });
            return this;
        },
        
        // these change methods
        // get the "this" context of a model
        // but i put it here for modularitys sake
        
        change: {
            
            path: function(model, path) {
                $(this.view.el).dialog('option', 'title', path);
            }
            
        }
        
    });
  
});

$(function() {
   
    window.Shred = Backbone.Model.extend({
      
        name: null,
        content: null,
        view: null,
        path: null,

        initialize: function(data) {
            
            this.view = new ShredView({
                model: this
            }).render();

        }
      
    });
   
});

$(function() {
   
   window.ShredList = Backbone.Collection.extend({
      
      model: Shred
      
   });
   
});

$(function() {
   
    window.Shreds = new ShredList();
    
    new FileMenu;
   
});