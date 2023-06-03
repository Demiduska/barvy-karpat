window.$ = global.$ = global.jQuery = $;
import Masonry from 'masonry-layout' ;

const md = 767;
const lg = 1024;

$(function () {
  if ($('.grid').length){
    let msnry = new Masonry( '.grid', {
      itemSelector: '.grid__item',
      percentPosition: true,
      columnWidth: '.grid__sizer',
      // horizontalOrder: true,
      gutter: 18,
    });
  }


});
