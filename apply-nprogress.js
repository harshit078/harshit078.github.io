
NProgress.start();
NProgress.set(0.4);
// Increment 
var interval = setInterval(function() { NProgress.inc(); }, 1000);
// Clear when window is loaded
$(window).on("load", function(){
    NProgress.done();
    clearInterval(interval);
});