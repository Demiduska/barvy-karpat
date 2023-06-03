window.$ = global.$ = global.jQuery = $;
import 'slick-carousel'

const md = 767;
const lg = 1024;

$(function () {

  $(".about__slider").slick( {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    infinite: true,
    centerMode: true,
    // centerPadding: '50px',
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    lazyLoad: 'ondemand',
    rows: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: md,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

});
