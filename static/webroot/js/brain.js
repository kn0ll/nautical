$(function() {
    
    Require.load([
        '/webroot/js/modules/File_Menu.js',
        '/webroot/js/modules/Shred.js',
        '/webroot/js/modules/Shred_List.js',
        '/webroot/js/modules/Shred_View.js'
    ], function() {
        
        // init
        window.Shreds = new Shred_List()
        new File_Menu
        
    });
   
})