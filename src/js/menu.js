window.$ = global.$ = global.jQuery = $;

const md = 767;
const lg = 1024;

$(function () {
  $(window).on('load resize', function () {

  });

  if (document.body.clientWidth <= lg) {
    $(document).on('click','.menu__link-arrow',function (e){
      e.preventDefault();
      $(this).toggleClass('active');
      $(this).parent().children('ul').slideToggle();
    })
  } else {
    $( ".menu__item-sub" ).hover(function(){
      $(this).addClass('active');
      $(this).children('ul').fadeIn();
    }, function(){
      $(this).removeClass('active');
      $(this).children('ul').fadeOut();
    });
  }

  $(document).on('click','.menu__button', function (e){
    e.preventDefault();
    $(this).find('.hamburger').toggleClass('active');
    $('.header__menu').fadeToggle();
    if (document.body.clientWidth <= lg) {
      $('body,html').toggleClass('no-scroll');
    }

  });





})

