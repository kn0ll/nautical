$(function() {
    
    Require.load([
        '/webroot/js/modules/File_Menu.js',
        '/webroot/js/modules/Shred.js',
        '/webroot/js/modules/Shred_List.js',
        '/webroot/js/modules/Shred_View.js',
        '/webroot/js/modules/Shred_Playlist.js'
    ], function() {
        
        // init
        window.Shreds = new Shred_List
        window.Playlist = new Shred_Playlist
        
        new File_Menu
        
    });
   
})