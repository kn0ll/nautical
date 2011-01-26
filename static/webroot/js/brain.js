$(function() {
    
    Require.load([
        '/webroot/js/modules/File_Menu.js',
        '/webroot/js/modules/Shred.js',
        '/webroot/js/modules/Shred_List.js',
        '/webroot/js/modules/Shred_View.js',
        '/webroot/js/modules/Shred_Queue.js'
    ], function() {
        
        // init
        window.Shreds = new Shred_List
        window.Queue = new Shred_Queue
        
        new File_Menu
        
    });
   
})