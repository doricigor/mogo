"use strict"

const app = {

    // ------------- Variable -------------

    $slider: $('.js-slider'),
    $sliderDots: $('.js-banner-dots'),
    $count: $('.js-count'),
    $countNum: $('.js-count-num'),
    $accordion: $('.js-accordion'),
    $accordionTitle: $('.js-accordion-title'),
    $accordionBody: $('.js-accordion-body'),
    $testimonial: $('.js-testimonial'),

    strAccordion: '.js-accordion',
    strAccordionBody: '.js-accordion-body',

    classActive: 'active',

    // ------------- Init function -------------

    init: function () {
        this.bindEvents();
        this.slider();
    },

    // ------------- Events -------------
    bindEvents: function () {
        const _this = this;

        // Count on scroll
        $(window).scroll(function () {
            app.count();
        });

        // Accordion trigger
        this.$accordionTitle.on('click', this.accordion);
    },

    // ------------- Functions -------------

    // Slick slider
    slider() {
        this.$slider.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            dots: true,
            appendDots: this.$sliderDots,
            autoplay: false,
            arrows: false,
            rows: 0
        });

        this.$testimonial.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 2000,
            dots: true,
            appendDots: false,
            autoplay: false,
            arrows: true,
            prevArrow: $('.js-testimonial-left'),
            nextArrow: $('.js-testimonial-right'),
            rows: 0
        });
    },

    count() {
        let checker = 0;
        const countFromTop = this.$count.offset().top;
        const windowHeight = window.innerHeight;
        const offset = countFromTop - windowHeight;
        const windowScroll = $(window).scrollTop();

        if (checker === 0 && windowScroll > offset) {
            app.$countNum.each(function () {
                const _self = $(this);
                const countTo = _self.attr('data-count');

                $({
                    countNum: _self.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        _self.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        _self.text(this.countNum);
                    }
                });
            });
            checker = 1;
        }
    },

    accordion() {
        if ($(this).parent().hasClass(app.classActive)) {
            $(this).siblings().slideUp();
            $(this).parent().removeClass(app.classActive);
        } else {
            $(app.strAccordionBody).slideUp();
            $(app.strAccordion).removeClass(app.classActive);
            $(this).siblings().slideDown();
            $(this).parent().addClass(app.classActive);
        }
    }
}

$(function () {
    app.init();
});