
$(document).bind('ready', function() {
    $(".hero-images a").mouseover(function() {
        $(this).find(".social-button-overlay").css("top", "0px");
    });
    
    $(".hero-images a").mouseout(function() {
        $(this).find(".social-button-overlay").css("top", "128px");
    });
});