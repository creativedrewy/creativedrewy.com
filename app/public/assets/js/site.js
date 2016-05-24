
$(document).bind('ready', function() {
    $(".hero-images a").mouseover(function() {
        $(this).find(".social-button-overlay").css("top", "0px");
    });
    
    $(".hero-images a").mouseout(function() {
        $(this).find(".social-button-overlay").css("top", "128px");
    });
    
    $(".read-it-button").on('click', function(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        
        var postContent = $(this).next();
        
        if (postContent.hasClass("open")) {
            postContent.show()
                .css("padding", "0px")
                .css("margin-top", "0px")
                .height(0)
                .removeClass("open");
        } else {
            postContent.show()
                .css("padding", "10px")
                .css("margin-top", "15px")
                .height("100%")
                .addClass("open");
        }
    });
});