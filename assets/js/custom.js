	$( window ).load(function() {
	   arrangeCarousel();
	});
	
	 $(window).resize(function(){
	 	
	 	$('.item > div').unwrap();
	  	arrangeCarousel();
	  });
	 
	function arrangeCarousel(){
		
		$('.carousel-inner').each(function(){
			
			size = $(this).data('size');
			carousel_id = $(this).attr('id');
			//console.log("carousel id" + carousel_id);
			screen_width = $( window ).width();
			var pid = $(this).parent().attr("id");
			console.log("data size "+size);
			
			
			
			//customize these checks...
			if(screen_width > 960) 		{result = size['md'].split('-');}
			else if(screen_width < 960 && screen_width > 480) {result = size['sm'].split('-'); }
			if(screen_width <= 480) {result = size['xs'].split('-'); }
				
				items = result[0];
				rows = result[1];
				
				var $pArr = $('#'+carousel_id+' > div');
				var pArrLen = $pArr.length;
				var pPerDiv = items*rows;
				
				
				//$("#"+pid+" > .carousel-indicators").html(' ');
				
				
				for (var i = 0;i < pArrLen;i+=pPerDiv){
					$pArr.filter(':eq('+i+'),:lt('+(i+pPerDiv)+'):gt('+i+')').wrapAll('<div class="item" />');
					
					
				}
				$('.item:first-child').addClass('active');
				var numItems = $('#'+pid+' .item').length;
				// for( var j = 0 ; j < numItems; j++)
				// {
					// $("#"+pid+" > .carousel-indicators").append('<li data-target="#'+pid+'" data-slide-to="'+j+'"></li>');
				// }
				//EMPTY current div...
				//find total class called 'item'
				//i=0; i< NUMMBBBEEERRR i++
			});	
		}