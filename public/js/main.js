(function($) {
    "use strict";
    
    function paralaxLogoInit() {
        var max_translate = 50, 
            header_logo_ob = $('nav.navbar-fixed-top').find('h1').find('a'), 
            header_new_logo_ob = $('nav.navbar-fixed-top').find('div.container').children('a'), 
            header_logo_ob_big = header_logo_ob.find('img'), 
            header_logo_ob_small;

        function getAlt() {
            var alt = header_logo_ob.find('img').attr('alt');

            if(alt) {
                return alt;
            }

            return "";
        }

        function getTranslate() {
            var scroll = $(window).scrollTop(), 
                slowScroll = scroll/2;

            if(slowScroll > max_translate) {
                slowScroll = max_translate;
            }

            return -slowScroll;
        }

        function initSecondary(newLayout) {
            if(!newLayout) {
                header_logo_ob_small = $('<img alt="' + getAlt() + '" src="img/saria-small-logo.png">').appendTo(header_logo_ob);
                
                header_logo_ob_big.css({
                    "position": "absolute", 
                    "top": 0, 
                    "left": 0, 
                    "z-index": 2
                });
                header_logo_ob_small.css({
                    "position": "absolute", 
                    "left": "30px", 
                    "top": "41px", 
                    "z-index": 1
                });
                header_logo_ob.css({
                    "position": "relative", 
                    "width": 230
                });
            }
            
        }

        function applyTopView(newLayout) {
            if(newLayout) {
                header_logo_ob.removeClass('top-view').find('span').fadeIn('fast');
            } else {
                header_logo_ob_big.fadeIn('fast');
            }
            
        }

        function applyBottomView(newLayout) {
            if(newLayout) {
                header_logo_ob.addClass('top-view').find('span').fadeOut('fast');
            } else {
                header_logo_ob_big.fadeOut('fast');
            }
            
        }

        function applyTransform(newLayout) {
            var translate_move = getTranslate();
                
            header_logo_ob.css({ transform: "translateY(" + translate_move + "px)" });
            if(Math.abs(translate_move) >= max_translate) {
                applyBottomView(newLayout);
            } else if(translate_move < max_translate) {
                applyTopView(newLayout);
            }
        }

        if(header_logo_ob.length) {
            initSecondary();
            $(window).scroll(function() {
                applyTransform();
            });
            applyTransform();
        } else if(header_new_logo_ob.length) {
            header_logo_ob = header_new_logo_ob;
            initSecondary(1);
            $(window).scroll(function() {
                applyTransform(1);
            });
            applyTransform(1);
        }
    }

    $(function() {
        $("div.myowl").owlCarouselImproved({
            items: 3,
            itemsDesktop: [1170, 3],
            itemsTablet: [600, 1],
            itemsTabletSmall: [500, 1],
            itemsMobile: [445, 1], 
            addClassActive: true
        });
        $("div.product-carousel").owlCarousel({
            items: 4,
            itemsDesktop: [1170, 4],
            itemsTablet: [600, 2],
            itemsTabletSmall: [500, 2],
            itemsMobile: [445, 1],
            navigation: true,
            pagination: false, 
            addClassActive: true
        });

        $('#left-sidebar').sidr({
        });
        
        $('#left-sidebar-close').sidr({
        });

        $('.submenu-button').click(function(e) {
            e.preventDefault();
            $(this).next().slideToggle();
        });
        
        $(".select").selectBoxIt();
        
        $('.video-wrapper').fitVids();
        
        $("#gallery_main_img").elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            gallery : "gallery_product",
            galleryActiveClass: "active", 
            responsive: true
        });
        $('#gallery_product').owlCarousel({
            items: 4,
            itemsDesktop: [1170, 4],
            //itemsTablet: [600, 4],
            //itemsTabletSmall: [500, 4],
            //itemsMobile: [445, 4],
            itemsCustom: [[0, 2], [400, 3], [700, 5], [1000, 6], [1200, 4], [1600, 4]],
            navigation: true,
            pagination: false, 
            addClassActive: true
        });
        
        paralaxLogoInit();
        
        $('.anim-left').addClass('hidden-anim').viewportChecker({
            classToAdd: 'visible-anim animated fadeInLeft',
            offset: 200    
        });
        
        $('.anim-right').addClass('hidden-anim').viewportChecker({
            classToAdd: 'visible-anim animated fadeInRight',
            offset: 200    
        });
        
        $('.product-box').addClass('hidden-anim').viewportChecker({
            classToAdd: 'visible-anim animated fadeInLeft',
            offset: 100    
        });
        
        $('.anim-top').addClass('hidden-anim').viewportChecker({
            classToAdd: 'visible-anim animated fadeInDown',
            offset: 200    
        });
        
        $('.anim-bottom').addClass('hidden-anim').viewportChecker({
            classToAdd: 'visible-anim animated fadeInUp',
            offset: 200    
        });
    });
})(jQuery);

//window.scrollReveal = new scrollReveal();