var Main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/kenzo/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Helpers = __webpack_require__(2);
	//let Animation = require("./components/animation");
	var Carousel = __webpack_require__(3);
	//let Share = require("./components/share");
	//let Youtube = require("./components/youtube");
	//let Statistic = require("./components/statistic");
	var Tabs = __webpack_require__(4);
	var Graph = __webpack_require__(5);
	var Popups = __webpack_require__(6);
	//let Forms = require("./components/forms");

	$(document).ready(function () {

	  DeviceDetection.run();
	  Helpers.init();
	  //Share.init();
	  Carousel.init();
	  Graph.init();
	  Tabs.init();
	  Popups.init();
	  //Forms.init();
	});

	/**
	 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
	 * @example
	 * Main.Form.isFormValid();
	 */
	module.exports = {
	  DeviceDetection: DeviceDetection,
	  Helpers: Helpers,
	  Carousel: Carousel,
	  //Share,
	  //Animation,
	  Graph: Graph,
	  Tabs: Tabs,
	  Popups: Popups
	  //Forms
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
	  sm: 767,
	  md: 1024,
	  lg: 1280,
	  xl: 1600
	};

	function isPortrait() {
	  return $(window).width() < $(window).height();
	}
	function isLandscape() {
	  return $(window).width() > $(window).height();
	}
	function isMobile() {
	  return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
	  return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isDesktopExt() {
	  return $(window).width() >= breakpoints.md;
	}
	function isDesktop() {
	  return $(window).width() > breakpoints.md;
	}
	function isTouch() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	function isMobileVersion() {
	  return !!~window.location.href.indexOf("/mobile/");
	}

	function run() {
	  if (isTouch()) {
	    $('html').removeClass('no-touch').addClass('touch');
	  } else {
	    $('html').removeClass('touch').addClass('no-touch');
	  }
	}

	module.exports = {
	  run: run,
	  isTouch: isTouch,
	  isMobile: isMobile,
	  isTablet: isTablet,
	  isDesktop: isDesktop,
	  isDesktopExt: isDesktopExt,
	  isMobileVersion: isMobileVersion,
	  isPortrait: isPortrait,
	  isLandscape: isLandscape
		};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Helpers
	 * @module Helpers
	 */

	// Add script asynh
	function addScript(url) {
	  var tag = document.createElement("script");
	  tag.src = url;
	  var firstScriptTag = document.getElementsByTagName("script")[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	(function () {

	  // проверяем поддержку
	  if (!Element.prototype.closest) {

	    // реализуем
	    Element.prototype.closest = function (css) {
	      var node = this;

	      while (node) {
	        if (node.matches(css)) return node;else node = node.parentElement;
	      }
	      return null;
	    };
	  }
	})();

	(function () {

	  // проверяем поддержку
	  if (!Element.prototype.matches) {

	    // определяем свойство
	    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
	  }
	})();

	/**
	 * Calculate scrollbar width in element
	 * - if the width is 0 it means the scrollbar is floated/overlayed
	 * - accepts "container" paremeter because ie & edge can have different
	 *   scrollbar behaviors for different elements using '-ms-overflow-style'
	 */
	function getNativeScrollbarWidth(container) {
	  container = container || document.body;

	  var fullWidth = 0;
	  var barWidth = 0;

	  var wrapper = document.createElement('div');
	  var child = document.createElement('div');

	  wrapper.style.position = 'absolute';
	  wrapper.style.pointerEvents = 'none';
	  wrapper.style.bottom = '0';
	  wrapper.style.right = '0';
	  wrapper.style.width = '100px';
	  wrapper.style.overflow = 'hidden';

	  wrapper.appendChild(child);
	  container.appendChild(wrapper);

	  fullWidth = child.offsetWidth;
	  wrapper.style.overflowY = 'scroll';
	  barWidth = fullWidth - child.offsetWidth;

	  container.removeChild(wrapper);

	  return barWidth;
	}

	var timer = void 0;
	var timeout = false;
	var delta = 200;
	function resizeEnd() {
	  if (new Date() - timer < delta) {
	    setTimeout(resizeEnd, delta);
	  } else {
	    timeout = false;
	    $(window).trigger('resizeend');
	  }
	}

	function toggleClassIf(el, cond, toggledClass) {
	  if (cond) {
	    el.addClass(toggledClass);
	  } else {
	    el.removeClass(toggledClass);
	  }
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
	  var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

	  if (el.length == 0) {
	    //console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
	    return false;
	  }

	  if (scrollValue == 'this') {
	    scrollValue = el.offset().top - $(window).outerHeight() / 2;
	  }

	  $(window).on('scroll', function (e) {
	    if ($(window).scrollTop() > scrollValue) {
	      el.addClass(toggledClass);
	    } else {
	      el.removeClass(toggledClass);
	    }
	  });
	};

	/* Menu */
	function showMenu() {
	  $('.main-menu').addClass('is-open');
	  $('body').addClass('menu-is-open');
	  if ($('.layout').outerHeight() > window.outerHeight) {
	    $('html, body').css('overflow-y', 'hidden');
	  }
	  $('.main-menu').animate({ 'left': '0px' }, 500);
	}
	function hideMenu() {
	  $('.main-menu').animate({ 'left': '-100%' }, 500);
	  $('.main-menu').removeClass('is-open');
	  $('body').removeClass('menu-is-open');
	  if ($('.layout').outerHeight() > window.outerHeight) {
	    $('html, body').css('overflow-y', '');
	  }
	}

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Helpers.init();
	 */
	function init() {

	  toggleElementClassOnScroll($('.header'), 50);

	  $('.js-toggle-block').on('click', function () {
	    var target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
	    if (target.hasClass('off')) {
	      target.removeClass('off').fadeIn(500);
	    } else {
	      target.addClass('off').fadeOut(500);
	    }
	  });

	  $(window).on('resize', function () {
	    timer = new Date();
	    if (timeout === false) {
	      timeout = true;
	      setTimeout(resizeEnd, delta);
	    }
	  });

	  $('.btn-menu').on('click', function (e) {
	    e.preventDefault();
	    showMenu();
	  });
	  $('.btn-menu').swipe({
	    swipeRight: function swipeRight() {
	      showMenu();
	    }
	  });
	  $('.btn-close-menu').on('click', function (e) {
	    e.preventDefault();
	    hideMenu();
	  });
	  $('.main-menu').swipe({
	    swipeLeft: function swipeLeft() {
	      hideMenu();
	    }
	  });

	  if (Main.DeviceDetection.isPortrait()) {
	    $('html').addClass('rotated');
	    $('.rotate').fadeIn(500);
	  }

	  $(window).on('resizeend', function () {
	    if (Main.DeviceDetection.isPortrait()) {
	      $('html').addClass('rotated');
	      $('.rotate').fadeIn(500);
	    } else {
	      $('.rotate').fadeOut(500);
	      $('html').removeClass('rotated');
	    }
	  });

	  $(window).scroll($.debounce(250, true, function () {
	    $('html').addClass('is-scrolling');
	  }));
	  $(window).scroll($.debounce(250, function () {
	    $('html').removeClass('is-scrolling');
	  }));
	}

	module.exports = {
	  init: init,
	  getNativeScrollbarWidth: getNativeScrollbarWidth,
	  toggleClassIf: toggleClassIf,
	  toggleElementClassOnScroll: toggleElementClassOnScroll,
	  addScript: addScript,
	  showMenu: showMenu,
	  hideMenu: hideMenu
		};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Карусель
	 * @module Carousel
	 */

	/**
	 * Инициализация карусели
	 */
	function init() {
	  var defSwiper = new Swiper(".swiper--default", {
	    slidesPerView: 1,
	    spaceBeteen: 0,
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev'
	    }
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * инициализация событий для кастомного селекта
	 * @example
	 * Tabs.init();
	 */

	function open(el) {
	  var tabContent = $(el.data('tab'));
	  close(el.siblings('.js-tab'));
	  el.addClass('active');
	  tabContent.addClass('active');
	  el.trigger('opened');
	}

	function close(els) {
	  els.removeClass('active');
	  $('.js-tab-content').removeClass('active');
	}

	function init() {

	  if ($('.js-tabs').length) {
	    var active = $('.js-tab.active').length ? $('.js-tab.active').eq(0) : $('.js-tab').eq(0);
	    open(active);
	  };

	  $('.js-tab').on('click', function () {
	    open($(this));
	  });
	}

	module.exports = {
	  init: init,
	  open: open,
	  close: close
		};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Graph
	 * @module Graph
	 */

	var graph = $('.graph');

	function getWeekData(arr) {
	  return arr.filter(function (item) {
	    return moment(item.date) > moment().subtract(7, 'days');
	  });
	}

	function calcHeight(val) {
	  var valPers = val * 100 / 5000;
	  valPers = Math.min(valPers, 100);
	  valPers = Math.max(valPers, 30);
	  var height = valPers * graph.innerHeight() / 100;
	  return height;
	}

	function init() {
	  if (graph.length) {
	    var graphData = getWeekData(graph.data('stats'));
	    graphData.forEach(function (item, i, arr) {
	      var classes = item.val >= 5000 ? "graph-item full" : "graph-item";
	      graph.append('<div data-date="' + item.date + '" data-val="' + item.val + '" class="' + classes + '" style="height: ' + calcHeight(item.val) + 'px"><div class="graph-item__title">' + item.val + '</div></div>');
	    });
	  }
	}

		module.exports = { init: init };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Popups
	 */

	function openPopup(id) {
	  var popup = $(id);
	  if (popup.hasClass('content-popup')) {
	    popup.closest('.popup-wrapper').fadeIn(500);
	    popup.siblings('.popup').removeClass('active');
	    popup.addClass('active');
	    $('html').addClass('popup-is-open');
	    $('.content-popup-conflict').removeClass('active');
	  } else if (popup.hasClass('fullsize-popup')) {
	    $('html, body').css('overflow', 'hidden');
	    $('html').addClass('modal-is-open');
	    popup.fadeIn(500);
	  } else {
	    openModal(popup);
	  }
	}
	function closePopup(id) {
	  var popup = $(id);
	  if (popup.hasClass('content-popup')) {
	    popup.closest('.popup-wrapper').fadeOut(500);
	    popup.removeClass('active');
	    $('html').removeClass('popup-is-open');
	    $('.content-popup-conflict').addClass('active');
	  } else if (popup.hasClass('fullsize-popup')) {
	    popup.fadeOut(500);
	    $('html').removeClass('modal-is-open');
	  }
	  if (Main.DeviceDetection.isMobile()) {
	    $('html, body').css('overflow', 'visible');
	  }
	}
	function closeAllPopups() {
	  $('.content-popup, fullsize-popup').removeClass('active');
	  $('.content-popup-conflict').addClass('active');
	}

	/* Modals */
	function openModal(modal) {
	  if (modal) {
	    var win = modal.find('.modal__window');
	    modal.fadeIn(500);
	    $('html, body').css('overflow', 'hidden');
	    $('html').addClass('modal-is-open');
	    win.fadeIn(500);
	    modal.trigger('modalopened');
	  } else {
	    console.error('Which modal?');
	  }
	}

	function closeModal(modal) {
	  if (modal) {
	    var win = modal.find('.modal__window');
	    win.fadeOut(500);
	    modal.fadeOut(500);
	    $('html').removeClass('modal-is-open');
	    if (Main.DeviceDetection.isMobile()) {
	      $('html, body').css('overflow', 'visible');
	    }
	    modal.trigger('modalclosed');
	  } else {
	    console.error('Which modal?');
	  }
	}

	function init() {

	  if (window.location.hash) {
	    openPopup(window.location.hash);
	  }

	  $('.js-popup').on('click', function (e) {
	    e.preventDefault();
	    var target = $(this).attr('href');
	    openPopup(target);
	  });
	  $('.js-close-popup').on('click', function (e) {
	    e.preventDefault();
	    var target = $(this).data('target') ? $(this).data('target') : '#' + $(this).closest('.popup').attr('id');
	    closePopup(target);
	  });

	  $('.btn-close-modal').on('click', function () {
	    var modal = !!$(this).data('target') ? $($(this).data('target')) : $(this).closest('.modal');
	    closeModal(modal);
	  });

	  $('.modal').on('click', function () {
	    closeModal($(this));
	  });

	  $('.modal__window, .modal .mCSB_scrollTools').on('click', function (e) {
	    e.stopPropagation();
	  });

	  $('.btn-modal').on('click', function (e) {
	    var target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
	    e.preventDefault();
	    openModal(target);
	  });
	}

	module.exports = {
	  init: init,
	  openPopup: openPopup,
	  closeAllPopups: closeAllPopups,
	  closePopup: closePopup,
	  openModal: openModal,
	  closeModal: closeModal
		};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhODE4YTNjM2UwNmI0YjU4Y2JmZCIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9ncmFwaC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvcG9wdXBzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhODE4YTNjM2UwNmI0YjU4Y2JmZCIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG4vL2xldCBBbmltYXRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiKTtcclxubGV0IENhcm91c2VsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jYXJvdXNlbFwiKTtcclxuLy9sZXQgU2hhcmUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NoYXJlXCIpO1xyXG4vL2xldCBZb3V0dWJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy95b3V0dWJlXCIpO1xyXG4vL2xldCBTdGF0aXN0aWMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3N0YXRpc3RpY1wiKTtcclxubGV0IFRhYnMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RhYnNcIik7XHJcbmxldCBHcmFwaCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZ3JhcGhcIik7XHJcbmxldCBQb3B1cHMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3BvcHVwc1wiKTtcclxuLy9sZXQgRm9ybXMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Zvcm1zXCIpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBEZXZpY2VEZXRlY3Rpb24ucnVuKCk7XHJcbiAgSGVscGVycy5pbml0KCk7XHJcbiAgLy9TaGFyZS5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIEdyYXBoLmluaXQoKTtcclxuICBUYWJzLmluaXQoKTtcclxuICBQb3B1cHMuaW5pdCgpO1xyXG4gIC8vRm9ybXMuaW5pdCgpO1xyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgSGVscGVycyxcclxuXHRDYXJvdXNlbCxcclxuICAvL1NoYXJlLFxyXG4gIC8vQW5pbWF0aW9uLFxyXG4gIEdyYXBoLFxyXG4gIFRhYnMsXHJcbiAgUG9wdXBzLFxyXG4gIC8vRm9ybXNcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL21haW4uanMiLCJsZXQgYnJlYWtwb2ludHMgPSB7XHJcbiAgc206IDc2NyxcclxuICBtZDogMTAyNCxcclxuICBsZzogMTI4MCxcclxuICB4bDogMTYwMFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNQb3J0cmFpdCgpIHtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDwgJCh3aW5kb3cpLmhlaWdodCgpKTtcclxufVxyXG5mdW5jdGlvbiBpc0xhbmRzY2FwZSgpIHtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gJCh3aW5kb3cpLmhlaWdodCgpKTtcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzRGVza3RvcEV4dCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZVZlcnNpb24oKXtcclxuICByZXR1cm4gISF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcIi9tb2JpbGUvXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBydW4oKXtcclxuICBpZihpc1RvdWNoKCkpe1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby10b3VjaCcpLmFkZENsYXNzKCd0b3VjaCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3RvdWNoJykuYWRkQ2xhc3MoJ25vLXRvdWNoJyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBydW4sXHJcbiAgaXNUb3VjaCxcclxuICBpc01vYmlsZSxcclxuICBpc1RhYmxldCxcclxuICBpc0Rlc2t0b3AsXHJcbiAgaXNEZXNrdG9wRXh0LFxyXG4gIGlzTW9iaWxlVmVyc2lvbixcclxuICBpc1BvcnRyYWl0LFxyXG4gIGlzTGFuZHNjYXBlXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCIvKipcclxuICogSGVscGVyc1xyXG4gKiBAbW9kdWxlIEhlbHBlcnNcclxuICovXHJcblxyXG4vLyBBZGQgc2NyaXB0IGFzeW5oXHJcbmZ1bmN0aW9uIGFkZFNjcmlwdCAodXJsKSB7XHJcbiAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgdGFnLnNyYyA9IHVybDtcclxuICB2YXIgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTtcclxuICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcclxufVxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0L/QvtC00LTQtdGA0LbQutGDXHJcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XHJcblxyXG4gICAgLy8g0YDQtdCw0LvQuNC30YPQtdC8XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24oY3NzKSB7XHJcbiAgICAgIHZhciBub2RlID0gdGhpcztcclxuXHJcbiAgICAgIHdoaWxlIChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhjc3MpKSByZXR1cm4gbm9kZTtcclxuICAgICAgICBlbHNlIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQv9C+0LTQtNC10YDQttC60YNcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuXHJcbiAgICAvLyDQvtC/0YDQtdC00LXQu9GP0LXQvCDRgdCy0L7QudGB0YLQstC+XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3I7XHJcblxyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIHNjcm9sbGJhciB3aWR0aCBpbiBlbGVtZW50XHJcbiAqIC0gaWYgdGhlIHdpZHRoIGlzIDAgaXQgbWVhbnMgdGhlIHNjcm9sbGJhciBpcyBmbG9hdGVkL292ZXJsYXllZFxyXG4gKiAtIGFjY2VwdHMgXCJjb250YWluZXJcIiBwYXJlbWV0ZXIgYmVjYXVzZSBpZSAmIGVkZ2UgY2FuIGhhdmUgZGlmZmVyZW50XHJcbiAqICAgc2Nyb2xsYmFyIGJlaGF2aW9ycyBmb3IgZGlmZmVyZW50IGVsZW1lbnRzIHVzaW5nICctbXMtb3ZlcmZsb3ctc3R5bGUnXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCAoY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyID0gY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIGxldCBmdWxsV2lkdGggPSAwO1xyXG4gIGxldCBiYXJXaWR0aCA9IDA7XHJcblxyXG4gIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbGV0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHdyYXBwZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gIHdyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICB3cmFwcGVyLnN0eWxlLmJvdHRvbSA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUud2lkdGggPSAnMTAwcHgnO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICBmdWxsV2lkdGggPSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG4gIGJhcldpZHRoID0gZnVsbFdpZHRoIC0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcblxyXG4gIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgcmV0dXJuIGJhcldpZHRoO1xyXG59XHJcblxyXG5sZXQgdGltZXI7XHJcbmxldCB0aW1lb3V0ID0gZmFsc2U7XHJcbmxldCBkZWx0YSA9IDIwMDtcclxuZnVuY3Rpb24gcmVzaXplRW5kKCkge1xyXG4gIGlmIChuZXcgRGF0ZSgpIC0gdGltZXIgPCBkZWx0YSkge1xyXG4gICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZW91dCA9IGZhbHNlO1xyXG4gICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZWVuZCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiBNZW51ICovXHJcbmZ1bmN0aW9uIHNob3dNZW51KCkge1xyXG4gICQoJy5tYWluLW1lbnUnKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1pcy1vcGVuJyk7XHJcbiAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gIH1cclxuICAkKCcubWFpbi1tZW51JykuYW5pbWF0ZSh7J2xlZnQnOiAnMHB4J30sIDUwMCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZU1lbnUoKSB7XHJcbiAgJCgnLm1haW4tbWVudScpLmFuaW1hdGUoeydsZWZ0JzogJy0xMDAlJ30sIDUwMCk7XHJcbiAgJCgnLm1haW4tbWVudScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtZW51LWlzLW9wZW4nKTtcclxuICBpZiAoJCgnLmxheW91dCcpLm91dGVySGVpZ2h0KCkgPiB3aW5kb3cub3V0ZXJIZWlnaHQpIHtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy10b2dnbGUtYmxvY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xyXG4gICAgaWYgKHRhcmdldC5oYXNDbGFzcygnb2ZmJykpIHtcclxuICAgICAgdGFyZ2V0LnJlbW92ZUNsYXNzKCdvZmYnKS5mYWRlSW4oNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRhcmdldC5hZGRDbGFzcygnb2ZmJykuZmFkZU91dCg1MDApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWVyID0gbmV3IERhdGUoKTtcclxuICAgIGlmICh0aW1lb3V0ID09PSBmYWxzZSkge1xyXG4gICAgICB0aW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKCcuYnRuLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNob3dNZW51KCk7XHJcbiAgfSk7XHJcbiAgJCgnLmJ0bi1tZW51Jykuc3dpcGUoe1xyXG4gICAgc3dpcGVSaWdodDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNob3dNZW51KCk7XHJcbiAgICB9XHJcbiAgfSlcclxuICAkKCcuYnRuLWNsb3NlLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGhpZGVNZW51KCk7XHJcbiAgfSk7XHJcbiAgJCgnLm1haW4tbWVudScpLnN3aXBlKHtcclxuICAgIHN3aXBlTGVmdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGhpZGVNZW51KCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc1BvcnRyYWl0KCkpIHtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygncm90YXRlZCcpO1xyXG4gICAgJCgnLnJvdGF0ZScpLmZhZGVJbig1MDApO1xyXG4gIH1cclxuXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemVlbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzUG9ydHJhaXQoKSkge1xyXG4gICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ3JvdGF0ZWQnKTtcclxuICAgICAgJCgnLnJvdGF0ZScpLmZhZGVJbig1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCgnLnJvdGF0ZScpLmZhZGVPdXQoNTAwKTtcclxuICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdyb3RhdGVkJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIHRydWUsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgaW5pdCwgXHJcbiAgZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGgsXHJcbiAgdG9nZ2xlQ2xhc3NJZiwgXHJcbiAgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwsIFxyXG4gIGFkZFNjcmlwdCwgXHJcbiAgc2hvd01lbnUsXHJcbiAgaGlkZU1lbnVcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaGVscGVycy5qcyIsIi8qKlxyXG4gKiDQmtCw0YDRg9GB0LXQu9GMXHJcbiAqIEBtb2R1bGUgQ2Fyb3VzZWxcclxuICovXHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIHZhciBkZWZTd2lwZXIgPSBuZXcgU3dpcGVyIChcIi5zd2lwZXItLWRlZmF1bHRcIiwge1xyXG4gICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgIHNwYWNlQmV0ZWVuOiAwLFxyXG4gICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCIvKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC60LDRgdGC0L7QvNC90L7Qs9C+INGB0LXQu9C10LrRgtCwXHJcbiAqIEBleGFtcGxlXHJcbiAqIFRhYnMuaW5pdCgpO1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG9wZW4oZWwpIHtcclxuICBsZXQgdGFiQ29udGVudCA9ICQoZWwuZGF0YSgndGFiJykpO1xyXG4gIGNsb3NlKGVsLnNpYmxpbmdzKCcuanMtdGFiJykpO1xyXG4gIGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB0YWJDb250ZW50LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICBlbC50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2UoZWxzKSB7XHJcbiAgZWxzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAkKCcuanMtdGFiLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcblxyXG4gIGlmICgkKCcuanMtdGFicycpLmxlbmd0aCkge1xyXG4gICAgbGV0IGFjdGl2ZSA9ICQoJy5qcy10YWIuYWN0aXZlJykubGVuZ3RoID8gJCgnLmpzLXRhYi5hY3RpdmUnKS5lcSgwKSA6ICQoJy5qcy10YWInKS5lcSgwKTtcclxuICAgIG9wZW4oYWN0aXZlKTtcclxuICB9O1xyXG5cclxuICAkKCcuanMtdGFiJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBvcGVuKCQodGhpcykpO1xyXG4gIH0pXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGluaXQsXHJcbiAgb3BlbixcclxuICBjbG9zZVxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwiLyoqXG4gKiBHcmFwaFxuICogQG1vZHVsZSBHcmFwaFxuICovXG5cbiBsZXQgZ3JhcGggPSAkKCcuZ3JhcGgnKTtcblxuZnVuY3Rpb24gZ2V0V2Vla0RhdGEgKGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBtb21lbnQoaXRlbS5kYXRlKSA+IG1vbWVudCgpLnN1YnRyYWN0KDcsICdkYXlzJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjYWxjSGVpZ2h0ICh2YWwpIHtcbiAgbGV0IHZhbFBlcnMgPSB2YWwgKiAxMDAgLyA1MDAwO1xuICB2YWxQZXJzID0gTWF0aC5taW4odmFsUGVycywgMTAwKTtcbiAgdmFsUGVycyA9IE1hdGgubWF4KHZhbFBlcnMsIDMwKTtcbiAgbGV0IGhlaWdodCA9IHZhbFBlcnMgKiBncmFwaC5pbm5lckhlaWdodCgpIC8gMTAwO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBpbml0ICgpIHtcbiAgaWYgKGdyYXBoLmxlbmd0aCkge1xuICAgIGxldCBncmFwaERhdGEgPSBnZXRXZWVrRGF0YShncmFwaC5kYXRhKCdzdGF0cycpKTtcbiAgICBncmFwaERhdGEuZm9yRWFjaCgoaXRlbSwgaSwgYXJyKSA9PiB7XG4gICAgICBsZXQgY2xhc3NlcyA9IGl0ZW0udmFsID49IDUwMDAgPyBcImdyYXBoLWl0ZW0gZnVsbFwiIDogXCJncmFwaC1pdGVtXCI7XG4gICAgICBncmFwaC5hcHBlbmQoYDxkaXYgZGF0YS1kYXRlPVwiJHtpdGVtLmRhdGV9XCIgZGF0YS12YWw9XCIke2l0ZW0udmFsfVwiIGNsYXNzPVwiJHtjbGFzc2VzfVwiIHN0eWxlPVwiaGVpZ2h0OiAke2NhbGNIZWlnaHQoaXRlbS52YWwpfXB4XCI+PGRpdiBjbGFzcz1cImdyYXBoLWl0ZW1fX3RpdGxlXCI+JHtpdGVtLnZhbH08L2Rpdj48L2Rpdj5gKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2dyYXBoLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgUG9wdXBzXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gb3BlblBvcHVwIChpZCkge1xyXG4gIGxldCBwb3B1cCA9ICQoaWQpO1xyXG4gIGlmIChwb3B1cC5oYXNDbGFzcygnY29udGVudC1wb3B1cCcpKSB7XHJcbiAgICBwb3B1cC5jbG9zZXN0KCcucG9wdXAtd3JhcHBlcicpLmZhZGVJbig1MDApO1xyXG4gICAgcG9wdXAuc2libGluZ3MoJy5wb3B1cCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIHBvcHVwLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygncG9wdXAtaXMtb3BlbicpO1xyXG4gICAgJCgnLmNvbnRlbnQtcG9wdXAtY29uZmxpY3QnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgfSBlbHNlIGlmIChwb3B1cC5oYXNDbGFzcygnZnVsbHNpemUtcG9wdXAnKSkge1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ21vZGFsLWlzLW9wZW4nKTtcclxuICAgIHBvcHVwLmZhZGVJbig1MDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBvcGVuTW9kYWwocG9wdXApO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBjbG9zZVBvcHVwIChpZCkge1xyXG4gIGxldCBwb3B1cCA9ICQoaWQpO1xyXG4gIGlmIChwb3B1cC5oYXNDbGFzcygnY29udGVudC1wb3B1cCcpKSB7XHJcbiAgICBwb3B1cC5jbG9zZXN0KCcucG9wdXAtd3JhcHBlcicpLmZhZGVPdXQoNTAwKTtcclxuICAgIHBvcHVwLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygncG9wdXAtaXMtb3BlbicpO1xyXG4gICAgJCgnLmNvbnRlbnQtcG9wdXAtY29uZmxpY3QnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfSBlbHNlIGlmIChwb3B1cC5oYXNDbGFzcygnZnVsbHNpemUtcG9wdXAnKSkge1xyXG4gICAgcG9wdXAuZmFkZU91dCg1MDApO1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdtb2RhbC1pcy1vcGVuJyk7XHJcbiAgfVxyXG4gIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpKSB7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGNsb3NlQWxsUG9wdXBzICgpIHtcclxuICAkKCcuY29udGVudC1wb3B1cCwgZnVsbHNpemUtcG9wdXAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgJCgnLmNvbnRlbnQtcG9wdXAtY29uZmxpY3QnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbn1cclxuXHJcblxyXG4vKiBNb2RhbHMgKi9cclxuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XHJcbiAgaWYgKG1vZGFsKSB7XHJcbiAgICBsZXQgd2luID0gbW9kYWwuZmluZCgnLm1vZGFsX193aW5kb3cnKTtcclxuICAgIG1vZGFsLmZhZGVJbig1MDApO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ21vZGFsLWlzLW9wZW4nKTtcclxuICAgIHdpbi5mYWRlSW4oNTAwKTtcclxuICAgIG1vZGFsLnRyaWdnZXIoJ21vZGFsb3BlbmVkJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xyXG4gIGlmIChtb2RhbCkge1xyXG4gICAgbGV0IHdpbiA9IG1vZGFsLmZpbmQoJy5tb2RhbF9fd2luZG93Jyk7XHJcbiAgICB3aW4uZmFkZU91dCg1MDApO1xyXG4gICAgbW9kYWwuZmFkZU91dCg1MDApO1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdtb2RhbC1pcy1vcGVuJyk7XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSkge1xyXG4gICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcbiAgICB9XHJcbiAgICBtb2RhbC50cmlnZ2VyKCdtb2RhbGNsb3NlZCcpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXQgKCkge1xyXG5cclxuICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgIG9wZW5Qb3B1cCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XHJcbiAgfVxyXG5cclxuICAkKCcuanMtcG9wdXAnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICBvcGVuUG9wdXAodGFyZ2V0KTtcclxuICB9KTtcclxuICAkKCcuanMtY2xvc2UtcG9wdXAnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA/ICQodGhpcykuZGF0YSgndGFyZ2V0JykgOiAnIycgKyAkKHRoaXMpLmNsb3Nlc3QoJy5wb3B1cCcpLmF0dHIoJ2lkJyk7XHJcbiAgICBjbG9zZVBvcHVwKHRhcmdldCk7XHJcbiAgfSlcclxuICBcclxuICAkKCcuYnRuLWNsb3NlLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBtb2RhbCA9ICEhJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA/ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkgOiAkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpO1xyXG4gICAgY2xvc2VNb2RhbChtb2RhbCk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgY2xvc2VNb2RhbCgkKHRoaXMpKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLm1vZGFsX193aW5kb3csIC5tb2RhbCAubUNTQl9zY3JvbGxUb29scycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA9PT0gJ3NlbGYnID8gJCh0aGlzKS5wYXJlbnQoKSA6ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuTW9kYWwodGFyZ2V0KTtcclxuICB9KTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGluaXQsXHJcbiAgb3BlblBvcHVwLFxyXG4gIGNsb3NlQWxsUG9wdXBzLFxyXG4gIGNsb3NlUG9wdXAsXHJcbiAgb3Blbk1vZGFsLFxyXG4gIGNsb3NlTW9kYWxcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvcG9wdXBzLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTs7Ozs7Ozs7QUN4Q0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBOzs7Ozs7OztBQ3ZOQTs7Ozs7QUFLQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBU0E7QUFDQTs7Ozs7Ozs7O0FDbkJBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7Ozs7Ozs7O0FDaENBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUNoQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==