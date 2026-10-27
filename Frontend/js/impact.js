var all = getReports();
var treated = all.filter(function (r) { return r.status === 'treated' || r.status === 'vet'; }).length;
var open = all.filter(function (r) { return r.status === 'reported' || r.status === 'responding'; }).length;
mount(topbar('Impact') + '<p>What the Pawmate community has done so far.</p><div class="grid2">' +
  statBox(all.length, 'Cases reported') + statBox(treated, 'Animals treated') + statBox(open, 'Cases open now') + statBox(ADOPTIONS.length, 'Waiting for a home') + '</div>' +
  '<div class="row"><h2>Treated rate</h2><span class="muted">' + (all.length ? Math.round(treated / all.length * 100) : 0) + '%</span></div>' +
  '<div class="bar"><i style="width:' + (all.length ? Math.round(treated / all.length * 100) : 0) + '%"></i></div>');
