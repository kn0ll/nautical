$(function() {
  
    var shred_open_form = $($('script#open-shred').html())
  
    window.FileMenu = Backbone.View.extend({
        
        el: $('ul#menu'),
        
        events: {
          'click .create': 'create',
          'click .open': 'open'
        },
        
        create: function() {
            Shreds.add();
        },
        
        open: function() {
            shred_open_form.dialog({
                resizable: false
            });
        }
        
    });
  
});

$(function() {
    
    var shred_template = $('script#shred-view').html(),
        shred_save_form = $($('script#save-shred').html());
  
    window.ShredView = Backbone.View.extend({
        
        el: null,
        
        events: {
            'click .save': 'save',
            'click .play': 'play',
            'click .stop': 'stop',
            'keyup .content': 'edit'
        },
        
        initialize: function() {
            var tmp = $(Mustache.to_html(shred_template, this.model.attributes));
            // proxy title to parent node we create
            $(this.el).html(tmp).attr('title', tmp.attr('title'));
            this.model.bind('change:name', this.change.title);
        },
        
        save: function() {
            shred_save_form.dialog({
                resizable: false
            })
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
            
            title: function(model, name) {
                $(this.view.el).dialog('option', 'title', name);
            }
            
        }
        
    });
  
});

$(function() {
   
    window.Shred = Backbone.Model.extend({
      
        name: null,
        content: null,
        view: null,

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