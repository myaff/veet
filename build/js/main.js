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

	$(document).ready(function () {

	  DeviceDetection.run();
	  Helpers.init();
	  //Share.init();
	  Carousel.init();
	  Graph.init();
	  Tabs.init();
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
	  Tabs: Tabs
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

	/* Modals */
	function openModal(modal) {
	  if (modal) {
	    var win = modal.find('.modal__window');
	    modal.fadeIn(500);
	    $('html, body').css('overflow-y', 'hidden');
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
	    $('html, body').css('overflow-y', '');
	    modal.trigger('modalclosed');
	  } else {
	    console.error('Which modal?');
	  }
	}

	function setScrollpad(els) {
	  if ($('.layout').outerHeight() > window.outerHeight) {
	    els.css({ 'padding-right': getNativeScrollbarWidth() + 'px' });
	  } else {
	    els.css({ 'padding-right': '0px' });
	  }
	}

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

	  $('.btn-close-modal').on('click', function () {
	    var modal = !!$(this).data('target') ? $($(this).data('target')) : $(this).closest('.modal');
	    closeModal(modal);
	  });

	  $('.modal').on('click', function () {
	    closeModal($(this));
	  });

	  $('.modal__window').on('click', function (e) {
	    e.stopPropagation();
	  });

	  $('.btn-modal').on('click', function (e) {
	    var target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
	    e.preventDefault();
	    openModal(target);
	  });

	  $(window).on('resize', function () {
	    timer = new Date();
	    if (timeout === false) {
	      timeout = true;
	      setTimeout(resizeEnd, delta);
	    }
	  });

	  setScrollpad($('.layout, .header'));

	  $(window).on('resizeend', function () {
	    setScrollpad($('.layout, .header'));
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
	  $(window).on('resizeend', function () {
	    if (Main.DeviceDetection.isMobile()) {
	      hideMenu();
	    } else {
	      showMenu();
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

	  $('.btn-accordion-menu').on('click', function (e) {
	    e.preventDefault();
	    $(this).closest('.multi').toggleClass('open');
	    $(this).siblings('.subnav').slideToggle(500);
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
	  openModal: openModal,
	  closeModal: closeModal,
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYmI0ODgxZGU2NGEwMTRmNTY2YSIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9ncmFwaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIva2Vuem8vYnVpbGQvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmJiNDg4MWRlNjRhMDE0ZjU2NmEiLCJsZXQgRGV2aWNlRGV0ZWN0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uXCIpO1xyXG5sZXQgSGVscGVycyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaGVscGVyc1wiKTtcclxuLy9sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbi8vbGV0IFNoYXJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zaGFyZVwiKTtcclxuLy9sZXQgWW91dHViZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMveW91dHViZVwiKTtcclxuLy9sZXQgU3RhdGlzdGljID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdGF0aXN0aWNcIik7XHJcbmxldCBUYWJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy90YWJzXCIpO1xyXG5sZXQgR3JhcGggPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2dyYXBoXCIpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBEZXZpY2VEZXRlY3Rpb24ucnVuKCk7XHJcbiAgSGVscGVycy5pbml0KCk7XHJcbiAgLy9TaGFyZS5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIEdyYXBoLmluaXQoKTtcclxuICBUYWJzLmluaXQoKTtcclxuICBcclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqINCh0L/QuNGB0L7QuiDRjdC60YHQv9C+0YDRgtC40YDRg9C10LzRi9GFINC80L7QtNGD0LvQtdC5LCDRh9GC0L7QsdGLINC40LzQtdGC0Ywg0Log0L3QuNC8INC00L7RgdGC0YPQvyDQuNC30LLQvdC1XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1haW4uRm9ybS5pc0Zvcm1WYWxpZCgpO1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgRGV2aWNlRGV0ZWN0aW9uLFxyXG4gIEhlbHBlcnMsXHJcblx0Q2Fyb3VzZWwsXHJcbiAgLy9TaGFyZSxcclxuICAvL0FuaW1hdGlvbixcclxuICBHcmFwaCxcclxuICBUYWJzXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG4gIHNtOiA3NjcsXHJcbiAgbWQ6IDEwMjQsXHJcbiAgbGc6IDEyODAsXHJcbiAgeGw6IDE2MDBcclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzUG9ydHJhaXQoKSB7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8ICQod2luZG93KS5oZWlnaHQoKSk7XHJcbn1cclxuZnVuY3Rpb24gaXNMYW5kc2NhcGUoKSB7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+ICQod2luZG93KS5oZWlnaHQoKSk7XHJcbn1cclxuZnVuY3Rpb24gaXNNb2JpbGUoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLnNtKTtcclxufVxyXG5mdW5jdGlvbiBpc1RhYmxldCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5zbSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3BFeHQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID49IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzRGVza3RvcCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc1RvdWNoKCl7XHJcbiAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XHJcbn1cclxuZnVuY3Rpb24gaXNNb2JpbGVWZXJzaW9uKCl7XHJcbiAgcmV0dXJuICEhfndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoXCIvbW9iaWxlL1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcnVuKCl7XHJcbiAgaWYoaXNUb3VjaCgpKXtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbm8tdG91Y2gnKS5hZGRDbGFzcygndG91Y2gnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCd0b3VjaCcpLmFkZENsYXNzKCduby10b3VjaCcpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcnVuLFxyXG4gIGlzVG91Y2gsXHJcbiAgaXNNb2JpbGUsXHJcbiAgaXNUYWJsZXQsXHJcbiAgaXNEZXNrdG9wLFxyXG4gIGlzRGVza3RvcEV4dCxcclxuICBpc01vYmlsZVZlcnNpb24sXHJcbiAgaXNQb3J0cmFpdCxcclxuICBpc0xhbmRzY2FwZVxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqIEhlbHBlcnNcclxuICogQG1vZHVsZSBIZWxwZXJzXHJcbiAqL1xyXG5cclxuLy8gQWRkIHNjcmlwdCBhc3luaFxyXG5mdW5jdGlvbiBhZGRTY3JpcHQgKHVybCkge1xyXG4gIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gIHRhZy5zcmMgPSB1cmw7XHJcbiAgdmFyIGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF07XHJcbiAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XHJcbn1cclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC/0L7QtNC00LXRgNC20LrRg1xyXG4gIGlmICghRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xyXG5cclxuICAgIC8vINGA0LXQsNC70LjQt9GD0LXQvFxyXG4gICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uKGNzcykge1xyXG4gICAgICB2YXIgbm9kZSA9IHRoaXM7XHJcblxyXG4gICAgICB3aGlsZSAobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoY3NzKSkgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgZWxzZSBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG59KSgpO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0L/QvtC00LTQtdGA0LbQutGDXHJcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XHJcblxyXG4gICAgLy8g0L7Qv9GA0LXQtNC10LvRj9C10Lwg0YHQstC+0LnRgdGC0LLQvlxyXG4gICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yO1xyXG5cclxuICB9XHJcblxyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgd2lkdGggaW4gZWxlbWVudFxyXG4gKiAtIGlmIHRoZSB3aWR0aCBpcyAwIGl0IG1lYW5zIHRoZSBzY3JvbGxiYXIgaXMgZmxvYXRlZC9vdmVybGF5ZWRcclxuICogLSBhY2NlcHRzIFwiY29udGFpbmVyXCIgcGFyZW1ldGVyIGJlY2F1c2UgaWUgJiBlZGdlIGNhbiBoYXZlIGRpZmZlcmVudFxyXG4gKiAgIHNjcm9sbGJhciBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBlbGVtZW50cyB1c2luZyAnLW1zLW92ZXJmbG93LXN0eWxlJ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGggKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBsZXQgZnVsbFdpZHRoID0gMDtcclxuICBsZXQgYmFyV2lkdGggPSAwO1xyXG5cclxuICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGxldCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICB3cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5ib3R0b20gPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS5yaWdodCA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgZnVsbFdpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcclxuICBiYXJXaWR0aCA9IGZ1bGxXaWR0aCAtIGNoaWxkLm9mZnNldFdpZHRoO1xyXG5cclxuICBjb250YWluZXIucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIHJldHVybiBiYXJXaWR0aDtcclxufVxyXG5cclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZW91dCA9IGZhbHNlO1xyXG5sZXQgZGVsdGEgPSAyMDA7XHJcbmZ1bmN0aW9uIHJlc2l6ZUVuZCgpIHtcclxuICBpZiAobmV3IERhdGUoKSAtIHRpbWVyIDwgZGVsdGEpIHtcclxuICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBmYWxzZTtcclxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemVlbmQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogTW9kYWxzICovXHJcbmZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbCkge1xyXG4gIGlmIChtb2RhbCkge1xyXG4gICAgbGV0IHdpbiA9IG1vZGFsLmZpbmQoJy5tb2RhbF9fd2luZG93Jyk7XHJcbiAgICBtb2RhbC5mYWRlSW4oNTAwKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICB3aW4uZmFkZUluKDUwMCk7XHJcbiAgICBtb2RhbC50cmlnZ2VyKCdtb2RhbG9wZW5lZCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdXaGljaCBtb2RhbD8nKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcclxuICBpZiAobW9kYWwpIHtcclxuICAgIGxldCB3aW4gPSBtb2RhbC5maW5kKCcubW9kYWxfX3dpbmRvdycpO1xyXG4gICAgd2luLmZhZGVPdXQoNTAwKTtcclxuICAgIG1vZGFsLmZhZGVPdXQoNTAwKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICBtb2RhbC50cmlnZ2VyKCdtb2RhbGNsb3NlZCcpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U2Nyb2xscGFkKGVscykge1xyXG4gIGlmICgkKCcubGF5b3V0Jykub3V0ZXJIZWlnaHQoKSA+IHdpbmRvdy5vdXRlckhlaWdodCkge1xyXG4gICAgZWxzLmNzcyh7J3BhZGRpbmctcmlnaHQnOiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCgpICsgJ3B4J30pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlbHMuY3NzKHsncGFkZGluZy1yaWdodCc6ICcwcHgnfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBNZW51ICovXHJcbmZ1bmN0aW9uIHNob3dNZW51KCkge1xyXG4gICQoJy5tYWluLW1lbnUnKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1pcy1vcGVuJyk7XHJcbiAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gIH1cclxuICAkKCcubWFpbi1tZW51JykuYW5pbWF0ZSh7J2xlZnQnOiAnMHB4J30sIDUwMCk7XHJcbn1cclxuZnVuY3Rpb24gaGlkZU1lbnUoKSB7XHJcbiAgJCgnLm1haW4tbWVudScpLmFuaW1hdGUoeydsZWZ0JzogJy0xMDAlJ30sIDUwMCk7XHJcbiAgJCgnLm1haW4tbWVudScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtZW51LWlzLW9wZW4nKTtcclxuICBpZiAoJCgnLmxheW91dCcpLm91dGVySGVpZ2h0KCkgPiB3aW5kb3cub3V0ZXJIZWlnaHQpIHtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy10b2dnbGUtYmxvY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xyXG4gICAgaWYgKHRhcmdldC5oYXNDbGFzcygnb2ZmJykpIHtcclxuICAgICAgdGFyZ2V0LnJlbW92ZUNsYXNzKCdvZmYnKS5mYWRlSW4oNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRhcmdldC5hZGRDbGFzcygnb2ZmJykuZmFkZU91dCg1MDApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLWNsb3NlLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBtb2RhbCA9ICEhJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA/ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkgOiAkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpO1xyXG4gICAgY2xvc2VNb2RhbChtb2RhbCk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgY2xvc2VNb2RhbCgkKHRoaXMpKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLm1vZGFsX193aW5kb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3Blbk1vZGFsKHRhcmdldCk7XHJcbiAgfSk7XHJcblxyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdGltZXIgPSBuZXcgRGF0ZSgpO1xyXG4gICAgaWYgKHRpbWVvdXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRpbWVvdXQgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzZXRTY3JvbGxwYWQoJCgnLmxheW91dCwgLmhlYWRlcicpKTtcclxuXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemVlbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgc2V0U2Nyb2xscGFkKCQoJy5sYXlvdXQsIC5oZWFkZXInKSk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnLmJ0bi1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzaG93TWVudSgpO1xyXG4gIH0pO1xyXG4gICQoJy5idG4tbWVudScpLnN3aXBlKHtcclxuICAgIHN3aXBlUmlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBzaG93TWVudSgpO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgJCgnLmJ0bi1jbG9zZS1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBoaWRlTWVudSgpO1xyXG4gIH0pO1xyXG4gICQoJy5tYWluLW1lbnUnKS5zd2lwZSh7XHJcbiAgICBzd2lwZUxlZnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBoaWRlTWVudSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQod2luZG93KS5vbigncmVzaXplZW5kJywgZnVuY3Rpb24oKXtcclxuICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpKSB7XHJcbiAgICAgIGhpZGVNZW51KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaG93TWVudSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNQb3J0cmFpdCgpKSB7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ3JvdGF0ZWQnKTtcclxuICAgICQoJy5yb3RhdGUnKS5mYWRlSW4oNTAwKTtcclxuICB9XHJcblxyXG4gICQod2luZG93KS5vbigncmVzaXplZW5kJywgZnVuY3Rpb24oKXtcclxuICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc1BvcnRyYWl0KCkpIHtcclxuICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdyb3RhdGVkJyk7XHJcbiAgICAgICQoJy5yb3RhdGUnKS5mYWRlSW4oNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoJy5yb3RhdGUnKS5mYWRlT3V0KDUwMCk7XHJcbiAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygncm90YXRlZCcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLWFjY29yZGlvbi1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCh0aGlzKS5jbG9zZXN0KCcubXVsdGknKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgJCh0aGlzKS5zaWJsaW5ncygnLnN1Ym5hdicpLnNsaWRlVG9nZ2xlKDUwMCk7XHJcbiAgfSlcclxuXHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgdHJ1ZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpbml0LCBcclxuICBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCxcclxuICB0b2dnbGVDbGFzc0lmLCBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCwgXHJcbiAgYWRkU2NyaXB0LCBcclxuICBvcGVuTW9kYWwsIFxyXG4gIGNsb3NlTW9kYWwsXHJcbiAgc2hvd01lbnUsXHJcbiAgaGlkZU1lbnVcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaGVscGVycy5qcyIsIi8qKlxyXG4gKiDQmtCw0YDRg9GB0LXQu9GMXHJcbiAqIEBtb2R1bGUgQ2Fyb3VzZWxcclxuICovXHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIHZhciBkZWZTd2lwZXIgPSBuZXcgU3dpcGVyIChcIi5zd2lwZXItLWRlZmF1bHRcIiwge1xyXG4gICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgIHNwYWNlQmV0ZWVuOiAwLFxyXG4gICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCIvKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC60LDRgdGC0L7QvNC90L7Qs9C+INGB0LXQu9C10LrRgtCwXHJcbiAqIEBleGFtcGxlXHJcbiAqIFRhYnMuaW5pdCgpO1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG9wZW4oZWwpIHtcclxuICBsZXQgdGFiQ29udGVudCA9ICQoZWwuZGF0YSgndGFiJykpO1xyXG4gIGNsb3NlKGVsLnNpYmxpbmdzKCcuanMtdGFiJykpO1xyXG4gIGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB0YWJDb250ZW50LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICBlbC50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2UoZWxzKSB7XHJcbiAgZWxzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAkKCcuanMtdGFiLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcblxyXG4gIGlmICgkKCcuanMtdGFicycpLmxlbmd0aCkge1xyXG4gICAgbGV0IGFjdGl2ZSA9ICQoJy5qcy10YWIuYWN0aXZlJykubGVuZ3RoID8gJCgnLmpzLXRhYi5hY3RpdmUnKS5lcSgwKSA6ICQoJy5qcy10YWInKS5lcSgwKTtcclxuICAgIG9wZW4oYWN0aXZlKTtcclxuICB9O1xyXG5cclxuICAkKCcuanMtdGFiJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBvcGVuKCQodGhpcykpO1xyXG4gIH0pXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGluaXQsXHJcbiAgb3BlbixcclxuICBjbG9zZVxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwiLyoqXG4gKiBHcmFwaFxuICogQG1vZHVsZSBHcmFwaFxuICovXG5cbiBsZXQgZ3JhcGggPSAkKCcuZ3JhcGgnKTtcblxuZnVuY3Rpb24gZ2V0V2Vla0RhdGEgKGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBtb21lbnQoaXRlbS5kYXRlKSA+IG1vbWVudCgpLnN1YnRyYWN0KDcsICdkYXlzJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjYWxjSGVpZ2h0ICh2YWwpIHtcbiAgbGV0IHZhbFBlcnMgPSB2YWwgKiAxMDAgLyA1MDAwO1xuICB2YWxQZXJzID0gTWF0aC5taW4odmFsUGVycywgMTAwKTtcbiAgdmFsUGVycyA9IE1hdGgubWF4KHZhbFBlcnMsIDMwKTtcbiAgbGV0IGhlaWdodCA9IHZhbFBlcnMgKiBncmFwaC5pbm5lckhlaWdodCgpIC8gMTAwO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBpbml0ICgpIHtcbiAgaWYgKGdyYXBoLmxlbmd0aCkge1xuICAgIGxldCBncmFwaERhdGEgPSBnZXRXZWVrRGF0YShncmFwaC5kYXRhKCdzdGF0cycpKTtcbiAgICBncmFwaERhdGEuZm9yRWFjaCgoaXRlbSwgaSwgYXJyKSA9PiB7XG4gICAgICBsZXQgY2xhc3NlcyA9IGl0ZW0udmFsID49IDUwMDAgPyBcImdyYXBoLWl0ZW0gZnVsbFwiIDogXCJncmFwaC1pdGVtXCI7XG4gICAgICBncmFwaC5hcHBlbmQoYDxkaXYgZGF0YS1kYXRlPVwiJHtpdGVtLmRhdGV9XCIgZGF0YS12YWw9XCIke2l0ZW0udmFsfVwiIGNsYXNzPVwiJHtjbGFzc2VzfVwiIHN0eWxlPVwiaGVpZ2h0OiAke2NhbGNIZWlnaHQoaXRlbS52YWwpfXB4XCI+PGRpdiBjbGFzcz1cImdyYXBoLWl0ZW1fX3RpdGxlXCI+JHtpdGVtLnZhbH08L2Rpdj48L2Rpdj5gKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2dyYXBoLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTs7Ozs7Ozs7QUN4Q0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7Ozs7Ozs7O0FDL1JBOzs7OztBQUtBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFTQTtBQUNBOzs7Ozs7Ozs7QUNuQkE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTs7Ozs7Ozs7QUNoQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Iiwic291cmNlUm9vdCI6IiJ9