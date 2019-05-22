let DeviceDetection = require("./components/device-detection");
let Helpers = require("./components/helpers");
//let Animation = require("./components/animation");
let Carousel = require("./components/carousel");
//let Share = require("./components/share");
//let Youtube = require("./components/youtube");
//let Statistic = require("./components/statistic");
let Tabs = require("./components/tabs");
let Graph = require("./components/graph");

$(document).ready(function(){
  
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
  DeviceDetection,
  Helpers,
	Carousel,
  //Share,
  //Animation,
  Graph,
  Tabs
};