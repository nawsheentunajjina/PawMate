var posts = load('pawmate_lostfound', LOSTFOUND), tab = 'all';
function draw() {
  var list = posts.filter(function (p) { return tab === 'all' || p.type === tab; });
  mount(topbar('Lost and found') +
    '<details class="note"><summary>Post a lost or found pet</summary><form id="lf" style="margin-top:12px">' +
    '<div class="field"><label for="t">Type</label><select id="t"><option value="lost">Lost</option><option value="found">Found</option></select></div>' +
    field('an', 'Animal (dog, cat...)') + '<div class="field"><label for="ds">Description</label><textarea id="ds"></textarea></div>' + field('ar', 'Area') + field('ct', 'Contact phone') +
    '<button class="btn big" type="submit">Post</button></form></details>' +
    '<div class="chips" style="margin-bottom:14px">' + ['all', 'lost', 'found'].map(function (x) { return '<button class="chip" data-t="' + x + '" aria-pressed="' + (tab === x) + '">' + x[0].toUpperCase() + x.slice(1) + '</button>'; }).join('') + '</div>' +
    (list.length ? list.map(function (p) {
      return '<article class="card"><div class="grow"><span class="badge">' + (p.type === 'lost' ? 'Lost' : 'Found') + '</span> <strong>' + esc(p.animal) + '</strong><div>' + esc(p.desc) + '</div><div class="muted">' + esc(p.area) + ' · ' + ago(p.createdAt) + '</div></div>' +
        (p.contact ? '<a class="btn" href="tel:' + esc(p.contact) + '">Call</a>' : '') + '</article>';
    }).join('') : empty('Nothing here yet.')));
  document.querySelectorAll('[data-t]').forEach(function (b) { b.onclick = function () { tab = b.dataset.t; draw(); }; });
  document.getElementById('lf').onsubmit = function (e) {
    e.preventDefault();
    if (!val('an') || !val('ar')) { alert('Please add the animal and the area.'); return; }
    posts.unshift({ id: Date.now(), type: val('t'), animal: val('an'), desc: val('ds'), area: val('ar'), contact: val('ct'), createdAt: Date.now() });
    save('pawmate_lostfound', posts); draw();
  };
}
draw();
