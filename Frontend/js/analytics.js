var all = getReports();
function count(key) { var o = {}; all.forEach(function (r) { o[r[key]] = (o[r[key]] || 0) + 1; }); return o; }
var byStatus = count('status'), byProblem = count('problem');
var weeks = [['Week 1', 4], ['Week 2', 7], ['Week 3', 5], ['Week 4', 9]];
var areas = [['Gulshan', 12], ['Banani', 9], ['Badda', 6], ['Mohakhali', 4]];
function rows(list) { var max = Math.max.apply(null, list.map(function (x) { return x[1]; })); return list.map(function (x) { return barRow(x[0], x[1], max); }).join(''); }
mount(topbar('Analytics') + '<div class="demo">Charts below mix your real demo reports with sample numbers. Later, MongoDB aggregation will feed them.</div>' +
  '<div class="grid2">' + statBox(all.length, 'Total reports') + statBox(byStatus.treated || 0, 'Treated') + '</div>' +
  '<div class="row"><h2>Cases per week (sample)</h2></div>' + rows(weeks) +
  '<div class="row"><h2>Cases by area (sample)</h2></div>' + rows(areas) +
  '<div class="row"><h2>By problem (your data)</h2></div>' + (all.length ? rows(Object.keys(byProblem).map(function (k) { return [k, byProblem[k]]; })) : empty('No reports yet.')) +
  '<div class="row"><h2>By status (your data)</h2></div>' + (all.length ? rows(Object.keys(byStatus).map(function (k) { return [LABEL[k], byStatus[k]]; })) : empty('No reports yet.')));
