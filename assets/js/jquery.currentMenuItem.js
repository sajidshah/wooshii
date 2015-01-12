(function($){
	
    $.currentItem = function() {
    	
            var pos, id_slide;
			pos = $(window).scrollTop();
				$(".slide-menu").each(function() {
					id_slide = $(this).attr("id");
				
					if($(this).offset().top <= pos + 100 && $("#desktop-menu li a[href$='#"+id_slide+"']").length > 0 && $(".onepage").length > 0) {
						$("#desktop-menu li.current_menu_item").removeClass("current_menu_item");
						$("#desktop-menu li a[href$='#"+id_slide+"']").parent().addClass("current_menu_item");	
					}
			});
    };
}(jQuery));