(function($) {
    "use strict";
    
    $.fn.owlCarouselImproved = function(options) {
        return this.each(function() {
            var current = null,
                drag_ob = null,
                ob,
                ob_instance,
                wrapper,
                slides,
                controls,
                dragging = true,
                dragging_timeout, 
                init_completed = $.Deferred(),
                settings = $.extend({
                    items: 3,
                    navigation: false,
                    pagination: false
                }, options, {
                    afterUpdate: function(_ob) {
                        updateOverlay();
                        updateBlurred();
                        if(typeof(options) !== "undefined" && typeof(options.afterUpdate) === "function") {
                            options.afterUpdate(_ob);
                        }
                    },
                    afterInit: function(_ob) {
                        $.when(init_completed).then(function() {
                            initOverlay();
                            updateBlurred();
                            if(dragging_timeout) {
                                clearTimeout(dragging_timeout);
                            }
                            dragging = false;
                        });
                        if(typeof(options) !== "undefined" && typeof(options.afterInit) === "function") {
                            options.afterInit(_ob);
                        }
                    },
                    beforeMove: function(_ob) {
                        if(dragging_timeout) {
                            clearTimeout(dragging_timeout);
                        }
                        dragging_timeout = setTimeout(function() {
                            dragging = false;
                            ob.find('.owl-item').find('a').unbind('click');
                        }, 300);
                        if(drag_ob) {
                            drag_ob
                                .removeClass('blurred')
                                .find('div.overlay')
                                .addClass('hidden');
                            drag_ob = null;
                        }
                        updateOverlay();
                        if(typeof(options) !== "undefined" && typeof(options.beforeMove) === "function") {
                            options.beforeMove(_ob);
                        }
                    },
                    afterMove: function(_ob) {
                        updateOverlay();
                        updateBlurred();
                        if(typeof(options) !== "undefined" && typeof(options.afterMove) === "function") {
                            options.afterMove(_ob);
                        }
                    },
                    startDragging: function(_ob) {
                        clearTimeout(dragging_timeout);
                        dragging = true;
                        drag_ob = ob
                            .find('.owl-item')
                                .not('.blurred');        
                        if(ob_instance.visibleItems.length > 1) {
                            drag_ob.addClass('blurred');
                        }
                        drag_ob.find('a').click(function() {
                            return false;
                        });
                        drag_ob = drag_ob.find('div.overlay')
                                        .filter('div.hidden')
                                            .hide()
                                            .removeClass('hidden')
                                            .fadeIn('fast')
                                        .end()
                                    .end();
                        if(typeof(options) !== "undefined" && typeof(options.startDragging) === "function") {
                            options.startDragging(_ob);
                        }
                    },
                    autoHeight: false
                });

            function init() {
                wrapper = $([
                    '<div class="owl-improved-wrapper">',
                        '<div class="owl-improved-slides">',
                        '</div>',
                        '<div class="owl-improved-controls">',
                            '<a class="prev text-hide" href="#">Prev</a> ',
                            '<a class="next text-hide" href="#">Next</a>',
                        '</div>',
                    '<div>'
                ].join('')).insertAfter(ob);
                slides = wrapper.children('div.owl-improved-slides');
                slides.append(ob.detach());
                controls = wrapper.children('div.owl-improved-controls');

                ob.owlCarousel(settings);

                controls.children('a.prev').on('click', function() {
                    ob.trigger('owl.prev');
                    return false;
                });
                controls.children('a.next').on('click', function() {
                    ob.trigger('owl.next');
                    return false;
                });
            }

            function initOverlay() {
                ob.find('.owl-item .carousel-block').append([
                    '<div class="overlay hidden"></div>'
                ]).find('div.overlay').click(function() {
                    var a = $(this).parents('div.owl-item:first').find('a:first');

                    if(!dragging && a.length && a.attr('href')) {
                        window.location = a.attr('href');
                    }
                    return false;
                });
                updateOverlay();
            }

            function updateOverlay() {
                var el = ob.find('.owl-item');

                el.find('div.overlay').filter('div.hidden').removeClass('hidden');
                el.each(function() {
                    var ob = $(this),
                        _index = ob.index();

                    if((ob_instance.visibleItems.length > 2) && ($.inArray(_index, ob_instance.visibleItems) !== -1)) {
                        if(_index !== ob_instance.visibleItems[0] && _index !== ob_instance.visibleItems[ob_instance.visibleItems.length - 1]) {
                            ob.find('div.overlay').not('div.hidden').addClass('hidden');
                        }
                    }
                });
            }

            function updateBlurred() {
                var el = ob.find('.owl-item'),
                    n;

                switch(ob_instance.visibleItems.length) {
                    case 0:
                    case 1:
                    case 2: el.removeClass('blurred');
                            return;
                }

                el.addClass('blurred');
                for(n in ob_instance.visibleItems) {
                    if((n !== '0') && (n !== ('' + (ob_instance.visibleItems.length - 1)))) {
                        el.filter(':eq('+ob_instance.visibleItems[n]+')').removeClass('blurred');
                    }
                }
            }

            ob = $(this);
            init(ob);
            ob_instance = ob.data('owlCarousel');
            init_completed.resolve();
        });
    };
}(jQuery));
