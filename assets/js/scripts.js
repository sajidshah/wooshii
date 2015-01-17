	

// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: ''
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '')
              .css('top', '');
            s.stickyElement.parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.parent().addClass(s.className);
            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();
    },
    methods = {
      init: function(options) {
        var o = $.extend(defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight());
          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom
          });
        });
      },
      update: scroller
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);
//////////////////////
/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * LOCAL SCROLL
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);

(function($) {
"use strict";
	jQuery(document).ready(function() {

		// New Scrollbar
		jQuery('#bg-fade').niceScroll({cursorcolor:"#404040"});
		
		
		  $("html").niceScroll();
	
		// Parallax effects
		//jQuery('#home').parallax("100%",0.1);
		
		
		// Local Scroll
		
		jQuery('#start-button').click(function() {
			var target_home = jQuery(this).attr('href');
			jQuery(window).scrollTo( target_home, 1000, { offset: 5 } );
			return false;
		});
		jQuery('#main-menu').localScroll({});
		$("#interior-main-menu").sticky({topSpacing:0});
		
		// hover content
		
		var $mainDiv = $(".hover");
       var $lowerDiv;//= $mainDiv.children('.hover-content'); 
	    
	    function showHideChild(flag , $loverDiv){
	        
	        var temp = (flag) ? 0 : 246;     
	        $lowerDiv.stop().animate({top:temp});
	    }
	
	    $(".hover").on({
	        mouseover: function(){                  
	            $lowerDiv = $(this).children('.hover-content');
	            showHideChild(true , $lowerDiv); 
	                                 
	        },
	        mouseout: function() {
	           	$lowerDiv = $(this).children('.hover-content');
	        	 showHideChild(false , $lowerDiv);
	        },   
	        touchstart: function(){
	        	$lowerDiv = $(this).children('.hover-content');
	            showHideChild(true , $lowerDiv);
	            
	            setTimeout(function(){
	            	$lowerDiv = $(this).children('.hover-content');
	               showHideChild(false , $lowerDiv);
	            },1500);
	        }
	    });
		
		
		
		// /hover content
		
		// Carosal s
		$('.carousel').carousel();
		
		// Toggle & Accordion
		$(".toggle").click(function() {
			var parent = $(this).parent();
			var content = $(".toggle-content",this);
				if(parent.hasClass("single-toggles")) {
					$(".toggle-title-text",parent).addClass("hover-icon");
					$(".toggle-arrow",parent).html("<i class='fa fa-caret-down'></i>");
				}
				if(content.css("display") === "none") {
					if(parent.hasClass("single-toggles")) {
						$(".toggle-content",parent).slideUp(200);
						$(".toggle-arrow",parent).html("<i class='fa fa-caret-down'></i>");
						$(".toggle-title-text",parent).addClass("hover-icon");
					}
					content.slideDown(200);
					$(".toggle-title-text",this).removeClass("hover-icon");
					$(".toggle-arrow",this).html("<i class='fa fa-caret-up'></i>");
				}
				else {
					content.slideUp(200);
					$(".toggle-title-text",this).addClass("hover-icon");
					$(".toggle-arrow",this).html("<i class='fa fa-caret-down'></i>");
				}
		});
		
		
		
		// Alert
		$(".close-alert").click(function() {
			$(this).parent().hide(400);
		});
		
		
		
		// Tabs
		$('.tabs-menu').each(function() {
            var $ul = $(this);
            var $li = $ul.children('li');
			
            $li.each(function() { 
                var $trescTaba = $($(this).children('a').attr('href'));
                if ($(this).hasClass('active-tab')) {
                    $trescTaba.show();
                } else {
                    $trescTaba.hide();
                }
            });
            $li.click(function() {$(this).children('a').click();});
            $li.children('a').click(function() {
                $li.removeClass('active-tab');         
                $li.each(function() {
                    $($(this).children('a').attr('href')).hide();
                });
                $(this).parent().addClass('active-tab');
                $($(this).attr('href')).show();
                return false;
            });
        });
		
		
		// Home Background Slideshow
		$(function () {
			var $anchors = jQuery('.bg-slider');
			(function _loop(idx) {
				$anchors.removeClass('slider-current').eq(idx).addClass('slider-current');
				setTimeout(function () {
				_loop((idx + 1) % $anchors.length);
				}, 5000);
			}(0));
		});
		
		
		
		// Current Menu Item		
		$(document).scroll(function(){
			$.currentItem();
		});

		$.currentItem();
		
		
		// Show Menu
		var main_menu = jQuery('#main-menu');
		
			var logo		 = jQuery('#main-menu img').data('logo');
			var logo_inverse = jQuery('#main-menu img').data('inverse');
		
		if(jQuery('#head-page').length > 0) main_menu.css('opacity', '1');
		
		jQuery(window).load(function() {
			if(jQuery('.is-sticky').length > 0 || jQuery('#page-content').length > 0) {
				main_menu.css('opacity', '1');
			}
			else {
				//main_menu.css('background-color','#ffffff');
				$("#main-manu #desktop-menu ul li a").css('color','#4e4e4e');
				
				jQuery("#main-menu img").attr('src',logo_inverse);
				
			}
		});
		
		jQuery(window).scroll(function() {
			if(jQuery('.is-sticky').length > 0 || jQuery('#page-content').length > 0) {
				main_menu.css('opacity', '1');
				main_menu.css('background-color','#ffffff');
				$("#main-menu a").css('color','#4e4e4e');
				$("#desktop-menu a").addClass('ahover');
				jQuery("#main-menu img").attr('src',logo_inverse);
			}
			else {
				//main_menu.css('opacity', '0');
				main_menu.css('background-color','');
				$("#desktop-menu a").removeClass('ahover');
				jQuery("#main-menu img").attr('src', logo);
				$("#desktop-menu a").css('color','#ffffff');
			}
		});
		
		
	
		
		// Backtop
		jQuery('#backtop').click(function() {
			$('html, body').animate({scrollTop: 0},1000);
		});
		
		
		// Menu Mobile
		var menu_mobile = jQuery('#mobile-menu-container')
		jQuery('#mobile-menu-button').click(function() {
			
			if(menu_mobile.css('display') == 'none') menu_mobile.slideDown(400);  
			else menu_mobile.slideUp(400);
		});
		
		jQuery('#mobile-menu ul li a').click(function() {
			menu_mobile.slideUp(400);
		});
		
		
	
	});	
})(jQuery);

	
		// CURRENT MENU ITEM
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
	

// menu sticky 

	(function($) {
	"use strict";
		jQuery(document).ready(function() {
	
			// Menu sticky
			jQuery('#main-menu').sticky({topSpacing:0});
		
		});	
	})(jQuery);


$(function(){
        $("h6 .first").typed({
            strings: ["Find An Animator Or Video Maker For Your "],
            typeSpeed: 0,
            callback: function() {
              showThis();
            },
          
        });
   
     function showThis(){

        $("span.second").typed({
              strings: ["Explainer", "Demo video", "Product video", "Customer Testimonial"],
              backDelay: 1500,    
              typeSpeed: 100,
              backSpeed: 100,
              loop: true,
              
          });

      }
   });