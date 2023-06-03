window.$ = global.$ = global.jQuery = $;

const md = 767;
const lg = 1024;

$(function () {
  $(window).on('load resize', function () {
    if (document.body.clientWidth <= lg) {


    } else {
      $( ".card" ).hover(
        function() {
          $(this).addClass( "active");
          $(this).find('.card__description').slideDown();
        }, function() {
          $(this).removeClass( "active");
          $(this).find('.card__description').slideUp();
        }
      );
    }

  })



})
