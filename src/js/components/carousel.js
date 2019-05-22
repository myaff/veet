/**
 * Карусель
 * @module Carousel
 */

/**
 * Инициализация карусели
 */
function init(){
  var defSwiper = new Swiper (".swiper--default", {
    slidesPerView: 1,
    spaceBeteen: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

}

module.exports = {init};