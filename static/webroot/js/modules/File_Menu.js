$(function() {
    
    var Open_Shred_Prompt = Backbone.View.extend({
        
        el: $('#open-shred'),
        
        events: {
            'submit form': 'open'
        },
        
        initialize: function() {
            this.el.dialog({
                resizable: false
            })
        },
        
        open: function(e) {
            Shreds.add({
                path: $('input', this.el).val()
            })
            this.el.dialog('destroy')
            return false
        }
        
    })
  
    window.File_Menu = Backbone.View.extend({
        
        el: $('ul#file-menu'),
        open_shred_prompt: null,
        
        events: {
          'click .create': 'create',
          'click .open': 'open'
        },
        
        create: function() {
            Shreds.add()
        },
        
        open: function() {
            if(this.open_shred_prompt)
                this.open_shred_prompt.initialize()
            else
                this.open_shred_prompt = new Open_Shred_Prompt
        }
        
    })
  
})