/**
 * инициализация событий для кастомного селекта
 * @example
 * Tabs.init();
 */

function open(el) {
  let tabContent = $(el.data('tab'));
  close(el.siblings('.js-tab'));
  el.addClass('active');
  tabContent.addClass('active');
  el.trigger('opened');
}

function close(els) {
  els.removeClass('active');
  $('.js-tab-content').removeClass('active');
}

function init(){


  if ($('.js-tabs').length) {
    let active = $('.js-tab.active').length ? $('.js-tab.active').eq(0) : $('.js-tab').eq(0);
    open(active);
  };

  $('.js-tab').on('click', function() {
    open($(this));
  })
}

module.exports = {
  init,
  open,
  close
};