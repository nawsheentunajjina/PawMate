(function () {
if (!requireRole('volunteer')) return;
var all = getReports(), open = all.filter(function (r) { return r.status === 'reported' || r.status === 'responding'; });
var mine = all.filter(function (r) { return r.helper === 'You'; });
var active = mine.filter(function (r) { return r.status === 'responding'; });
var done = mine.filter(function (r) { return r.status === 'treated' || r.status === 'vet'; });
var waiting = all.filter(function (r) { return r.status === 'reported'; });
mount(topbar('Volunteer dashboard') + '<div class="grid2">' + statBox(open.length, 'Open cases') + statBox(active.length, 'Active for you') + statBox(done.length, 'Animals helped') + statBox(mine.length, 'Total taken') + '</div>' +
  '<div class="row"><h2>Active cases</h2></div>' + (active.length ? active.map(reportCard).join('') : empty('No active case. Pick one from the map.')) +
  '<div class="row"><h2>Waiting for a volunteer</h2></div>' + (waiting.length ? waiting.map(reportCard).join('') : empty('Nothing waiting right now.')));
})();