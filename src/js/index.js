// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
window.$ = global.$ = global.jQuery = $;
import Blazy from 'blazy';
import anime from 'animejs/lib/anime.es.js';
import WOW from 'wow.js';
//import '@fancyapps/fancybox';
//import 'jquery-datetimepicker';
import './menu';
//import './tabs';
//import './card';
import './sliders';
//import './gallery';
//import Inputmask from "inputmask";

const md = 767;
const lg = 1024;

/*
Animation hero title
 */

// Wrap every letter in a span
let textWrapper = document.querySelector('.letters');
if (textWrapper){
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
}


const animeHero = anime.timeline({loop: false, autoplay: false})
  .add({
    targets: '.words--1 .word',
    scale: [14, 1],
    opacity: [0, 1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 700 + (800 * i)
  })
  .add({
    targets: '.words--2 .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
     delay: (el, i) => 45 * (i + 1)
  })
  .add({
  targets: '.hero__button',
  opacity: [0,1],
  scale: [0.2, 1],
  duration: 1500
});

const animeHero2 = anime.timeline({loop: false, autoplay: false})
  .add({
    targets: '.words--3 .letter',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  })

const animeCircles = anime.timeline({loop: true, autoplay: true})
  .add({
    targets: '.hero__button-video-1',
    opacity: [1,0],
    scale: [1,4],
    easing: "easeOutCirc",
    duration: 2400
  });

const animeCircles2 = anime.timeline({loop: true, autoplay: true})
  .add({
    targets: '.hero__button-video-2',
    scale: [1,2],
    easing: "easeOutSine",
    duration: 1400
  })
  .add({
    targets: '.hero__button-video-2',
    scale: [2,1],
    easing: "easeOutSine",
    duration: 1400
  });

/*
Observer
 */
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}

let fired = false;
const callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!fired) {
        fired = true;
        animeHero.play();
        animeHero2.play();
      }

    }
  });
};
const observer = new IntersectionObserver(callback, options);

const target = document.querySelector('.hero h1');
if (target){
  observer.observe(target);
}


$(function () {
  /*
  Init bLazy
   */
  const bLazy = new Blazy;


  /*
    Init wow
  */

  const wow = new WOW({
    animateClass: 'animate__animated'
  });
  wow.init();
   /*
    sticky header
   */
  const addStickyHeader = () => {
    if ($(window).scrollTop()){
      $('header').addClass('header--sticky');
    } else{
      $('header').removeClass('header--sticky');
    }
  }
  $(window).on('load scroll', function () {
    addStickyHeader();
  });


  $(window).on('load resize', function () {
    bLazy.revalidate();
    console.log('resize');
  });


  icons_load();


  // const phone = new Inputmask({
  //   mask: '+1 (999) 999-9999',
  // });
  // const email = new Inputmask({
  //   greedy: false,
  //   definitions: {
  //     '*': {
  //       validator: "[0-9A-Za-zйцукенгшщзхъфывапролджэячсмитьбю@!#$%&'*+/=?^_`{|}~\-]",
  //       casing: "lower"
  //     }
  //   }
  // });
  //
  // phone.mask('input[type="tel"]');
  // email.mask('.input--email');

  $(document).on('click', '.input--checkbox', function (e) {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('#checkbox').prop('checked', true);
      $(this).parents('form').find('button').prop('disabled', false);
    } else {
      $('#checkbox').prop('checked', false);
      $(this).parents('form').find('button').prop('disabled', true);
    }
  });
  $(".scrollTo").on('click', function (e) {
    e.preventDefault();
    let target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: ($(target).offset().top)
    }, 2000);
  });


  //ajax

  $(document).on('click', '.link--show', function (e) {
    let action = $(this).data('action');
    let title = $(this).data('title');
    let $container = $('#popup-result');
    let id = $(this).data('id');
    let data = {
      action: action,
      title: title,
      id: id
    }
    $.ajax({
      url: 'ajax/actions.php',
      data: data,
      type: "POST",
      beforeSend: function (response) {
        $container.fadeIn();
        $container.addClass("with-loader").append("<div class='loader loader--top'>" + loaderGetCode() + "</div>");
      },
      success: function (response) {
        if (response) {
          $container.find('.popup__content').empty().append(response);
          $container.removeClass("with-loader");
          $container.find(".loader").remove();
          // console.log(response);
        }
      },
      error: function (jqXHR) {
        $container.find(".loader").remove();
        console.log('error');
      }
    });
  })


  $(document).on('focus', '.input,.input--textarea', function (e) {
    $(this).parents('.form__input').find('.input--placeholder').fadeIn();
    $(this).addClass('focus');
  });
  $(document).on('blur', '.input,.input--textarea', function (e) {
    if ($(this).val() === '') {
      $(this).parents('.form__input').find('.input--placeholder').fadeOut();
      $(this).removeClass('focus');
    }
  });
  $('.datetimepicker').datetimepicker({
    theme:'dark',
    minDate: 0,
  });

});


/*
* SVG icon url update
* */

function icons_load() {
  var url = $('body').data('svg-sprite-url');
  $.ajax({
    url: url,
    localCache: true,
    cacheTTL: 1,
    dataType: 'text',
    cacheKey: 'svg-sprite'
  }).done(function (response) {
    $('body').append('<div id="svg-icons-container" style="height: 0; width: 0; position: absolute; top: -99999px; left: 0; visibility: hidden;">' + response + '</div>');
  });
}

function setVw() {
  let vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}

setVw();
window.addEventListener('resize', setVw);

function loaderGetCode() {
  return '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">        <path fill="#4647a8" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(243.722 25 25)">        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>        </path>        </svg>';
}



