/**
 * Переключение классов по различным событиям
 * @module Popups
 */

function openPopup (id) {
  let popup = $(id);
  if (popup.hasClass('content-popup')) {
    popup.addClass('active');
    $('.content-popup-conflict').removeClass('active');
    if (popup.hasClass('action-popup')){
      if (Main.DeviceDetection.isMobile()) {
        $('html, body').animate({'scrollTop': 0}, 500);
        $('html, body').css('overflow', 'hidden');
      }
      $('html').addClass('popup-opened');
    }
  } else if (popup.hasClass('fullsize-popup')) {
    $('html, body').css('overflow', 'hidden');
    $('html').addClass('modal-opened');
    popup.fadeIn(500);
  } else {
    openModal(popup);
  }
}
function closePopup (id) {
  let popup = $(id);
  if (popup.hasClass('content-popup')) {
    popup.removeClass('active');
    $('html').removeClass('popup-opened');
    $('.content-popup-conflict').addClass('active');
  } else if (popup.hasClass('fullsize-popup')) {
    popup.fadeOut(500);
    $('html').removeClass('modal-opened');
  }
  if (Main.DeviceDetection.isMobile()) {
    $('html, body').css('overflow', 'visible');
  }
}
function closeAllPopups () {
  $('.content-popup, fullsize-popup').removeClass('active');
  $('.content-popup-conflict').addClass('active');
}


/* Modals */
function openModal(modal) {
  if (modal) {
    let win = modal.find('.modal__window');
    modal.fadeIn(500);
    $('html, body').css('overflow', 'hidden');
    $('html').addClass('modal-opened');
    win.fadeIn(500);
    modal.trigger('modalopened');
  } else {
    console.error('Which modal?');
  }
}

function closeModal(modal) {
  if (modal) {
    let win = modal.find('.modal__window');
    win.fadeOut(500);
    modal.fadeOut(500);
    $('html').removeClass('modal-opened');
    if (Main.DeviceDetection.isMobile()) {
      $('html, body').css('overflow', 'visible');
    }
    modal.trigger('modalclosed')
  } else {
    console.error('Which modal?');
  }
}


function init () {

  $('.js-popup').on('click', function(e) {
    e.preventDefault();
    let target = $(this).attr('href');
    openPopup(target);
  });
  $('.js-close-popup').on('click', function(e) {
    e.preventDefault();
    let target = $(this).data('target') ? $(this).data('target') : '#' + $(this).closest('.popup').attr('id');
    closePopup(target);
  })
  
  $('.btn-close-modal').on('click', function(){
    let modal = !!$(this).data('target') ? $($(this).data('target')) : $(this).closest('.modal');
    closeModal(modal);
  });

  $('.modal').on('click', function() {
    closeModal($(this));
  });

  $('.modal__window, .modal .mCSB_scrollTools').on('click', function(e) {
    e.stopPropagation();
  });

  $('.btn-modal').on('click', function(e) {
    let target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
    e.preventDefault();
    openModal(target);
  });

}

module.exports = {
  init,
  openPopup,
  closeAllPopups,
  closePopup,
  openModal,
  closeModal
};