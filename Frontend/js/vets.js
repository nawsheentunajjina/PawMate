var only24 = false;
function draw() {
  var list = VETS.filter(function (v) { return !only24 || v.open24; });
  mount(topbar('Vets and clinics') + '<div class="demo">Sample data. Replace with real clinics and numbers.</div>' +
    '<div class="chips" style="margin-bottom:14px"><button class="chip" id="f24" aria-pressed="' + only24 + '">Open 24 hours</button></div>' +
    list.map(function (v) {
      return '<article class="card"><div class="grow"><strong>' + esc(v.name) + '</strong>' + (v.partner ? ' <span class="badge">Partner</span>' : '') +
        '<div class="muted">' + esc(v.area) + ' · ' + (v.open24 ? 'Open 24h' : esc(v.hours)) + '</div></div><a class="btn" href="tel:' + esc(v.phone) + '">Call</a></article>';
    }).join(''));
  document.getElementById('f24').onclick = function () { only24 = !only24; draw(); };
}
draw();
