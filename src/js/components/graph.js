/**
 * Graph
 * @module Graph
 */

 let graph = $('.graph');

function getWeekData (arr) {
  return arr.filter(function (item) {
    return moment(item.date) > moment().subtract(7, 'days');
  });
}

function calcHeight (val) {
  let valPers = val * 100 / 5000;
  valPers = Math.min(valPers, 100);
  valPers = Math.max(valPers, 30);
  let height = valPers * graph.innerHeight() / 100;
  return height;
}

function init () {
  if (graph.length) {
    let graphData = getWeekData(graph.data('stats'));
    graphData.forEach((item, i, arr) => {
      let classes = item.val >= 5000 ? "graph-item full" : "graph-item";
      graph.append(`<div data-date="${item.date}" data-val="${item.val}" class="${classes}" style="height: ${calcHeight(item.val)}px"><div class="graph-item__title">${item.val}</div></div>`);
    });
  }
}


module.exports = { init };