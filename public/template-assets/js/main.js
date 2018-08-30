(function () {
  var isMobile = {
    Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  const fullHeight = function () {
    if (!isMobile.any()) {
      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(() => {
        $('.js-fullheight').css('height', $(window).height());
      });
    }
  };


  const counter = function () {
    $('.js-counter').countTo({
      formatter(value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };


  const counterWayPoint = function () {
    if ($('#colorlib-counter').length > 0) {
      $('#colorlib-counter').waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(counter, 400);
          $(this.element).addClass('animated');
        }
      }, { offset: '90%' });
    }
  };

  // Animations
  const contentWayPoint = function () {
    let i = 0;
    $('.animate-box').waypoint(function (direction) {
      if (direction === 'down' && !$(this.element).hasClass('animated')) {
        i++;

        $(this.element).addClass('item-animate');
        setTimeout(() => {
          $('body .animate-box.item-animate').each(function (k) {
            const el = $(this);
            setTimeout(() => {
              const effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn animated');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft animated');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight animated');
              } else {
                el.addClass('fadeInUp animated');
              }

              el.removeClass('item-animate');
            }, k * 200, 'easeInOutExpo');
          });
        }, 100);
      }
    }, { offset: '85%' });
  };


  const burgerMenu = function () {
    $('.js-colorlib-nav-toggle').on('click', function (event) {
      event.preventDefault();
      const $this = $(this);

      if ($('body').hasClass('offcanvas')) {
        $this.removeClass('active');
        $('body').removeClass('offcanvas');
      } else {
        $this.addClass('active');
        $('body').addClass('offcanvas');
      }
    });
  };

  // Click outside of offcanvass
  const mobileMenuOutsideClick = function () {
    $(document).click((e) => {
      const container = $('#colorlib-aside, .js-colorlib-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas')) {
          $('body').removeClass('offcanvas');
          $('.js-colorlib-nav-toggle').removeClass('active');
        }
      }
    });

    $(window).scroll(() => {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }
    });
  };

  const clickMenu = function () {
    $('#navbar a:not([class="external"])').click(function (event) {
      let section = $(this).data('nav-section'),
        navbar = $('#navbar');

      if ($(`[data-section="${section}"]`).length) {
        $('html, body').animate({
          scrollTop: $(`[data-section="${section}"]`).offset().top - 55
        }, 500);
      }

      if (navbar.is(':visible')) {
        navbar.removeClass('in');
        navbar.attr('aria-expanded', 'false');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }

      event.preventDefault();
      return false;
    });
  };

  // Reflect scrolling in navigation
  const navActive = function (section) {
    const $el = $('#navbar > ul');
    $el.find('li').removeClass('active');
    $el.each(function () {
      $(this).find(`a[data-nav-section="${section}"]`).closest('li').addClass('active');
    });
  };

  const navigationSection = function () {
    const $section = $('section[data-section]');

    $section.waypoint(function (direction) {
      if (direction === 'down') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: '150px'
    });

    $section.waypoint(function (direction) {
      if (direction === 'up') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset() {
        return -$(this.element).height() + 155;
      }
    });
  };


  const sliderMain = function () {
    $('#colorlib-hero .flexslider').flexslider({
      animation: 'fade',
      slideshowSpeed: 5000,
      directionNav: true,
      start() {
        setTimeout(() => {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      },
      before() {
        setTimeout(() => {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      }

    });
  };

  const stickyFunction = function () {
    const h = $('.image-content').outerHeight();

    if ($(window).width() <= 992) {
      $('#sticky_item').trigger('sticky_kit:detach');
    } else {
      $('.sticky-parent').removeClass('stick-detach');
      $('#sticky_item').trigger('sticky_kit:detach');
      $('#sticky_item').trigger('sticky_kit:unstick');
    }

    $(window).resize(() => {
      const h = $('.image-content').outerHeight();
      $('.sticky-parent').css('height', h);


      if ($(window).width() <= 992) {
        $('#sticky_item').trigger('sticky_kit:detach');
      } else {
        $('.sticky-parent').removeClass('stick-detach');
        $('#sticky_item').trigger('sticky_kit:detach');
        $('#sticky_item').trigger('sticky_kit:unstick');

        $('#sticky_item').stick_in_parent();
      }
    });

    $('.sticky-parent').css('height', h);

    $('#sticky_item').stick_in_parent();
  };

  const owlCrouselFeatureSlide = function () {
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: true,
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoHeight: true,
      items: 1,
      navText: [
        "<i class='icon-arrow-left3 owl-direction'></i>",
        "<i class='icon-arrow-right3 owl-direction'></i>"
      ]
    });
  };

  // Document on load.
  $(() => {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();

    clickMenu();
    // navActive();
    navigationSection();
    // windowScroll();


    mobileMenuOutsideClick();
    sliderMain();
    stickyFunction();
    owlCrouselFeatureSlide();
  });
}());
