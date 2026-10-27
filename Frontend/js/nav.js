// Shared UI helpers: bottom tab bar, top bar, page mount, small components
var NAVICONS = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  cases: '<path d="M9 5h10M9 12h10M9 19h10M4 5h.01M4 12h.01M4 19h.01"/>',
  explore: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'
};
function bottomNav(active) {
  var items = [['home', 'Home', 'index.html'], ['cases', 'My cases', 'my-cases.html'], ['explore', 'Explore', 'explore.html'], ['profile', 'Profile', 'profile.html']];
  return '<nav class="tabbar" aria-label="Main">' + items.map(function (i) {
    return '<a href="' + i[2] + '"' + (i[0] === active ? ' aria-current="page"' : '') + '><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#636363" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + NAVICONS[i[0]] + '</svg>' + i[1] + '</a>';
  }).join('') + '</nav>';
}
function topbar(title, back) {
  return '<div class="topbar"><a class="back" href="' + (back || 'explore.html') + '" aria-label="Back">&larr;</a><h1>' + esc(title) + '</h1></div>';
}
function mount(html, nav) {
  document.getElementById('app').innerHTML = html;
  document.querySelectorAll('.tabbar').forEach(function (n) { n.remove(); });
  if (nav) document.body.insertAdjacentHTML('beforeend', bottomNav(nav));
}
function reportCard(r) {
  return '<article class="card">' + (r.photo ? '<img class="thumb" src="' + r.photo + '" alt="">' : '<div class="thumb"></div>') +
    '<div class="grow"><strong>' + esc(r.animal) + ' · ' + esc(r.problem) + '</strong><div class="muted">' + ago(r.createdAt) + '</div>' +
    '<span class="status s-' + r.status + '">' + LABEL[r.status] + '</span></div><a class="btn" href="details.html?id=' + r.id + '">View</a></article>';
}
function empty(t) { return '<div class="empty">' + t + '</div>'; }
function tile(href, title, sub) { return '<a class="tile" href="' + href + '"><strong>' + esc(title) + '</strong><span class="muted">' + esc(sub) + '</span></a>'; }
function statBox(n, l) { return '<div class="stat"><b>' + n + '</b><div class="muted">' + l + '</div></div>'; }
function barRow(label, n, max) { return '<div class="hrow"><span>' + esc(label) + '</span><div class="bar"><i style="width:' + Math.round(n / (max || 1) * 100) + '%"></i></div><span>' + n + '</span></div>'; }
function field(id, label, type, ph) { return '<div class="field"><label for="' + id + '">' + label + '</label><input type="' + (type || 'text') + '" id="' + id + '"' + (ph ? ' placeholder="' + ph + '"' : '') + '></div>'; }
function val(id) { return document.getElementById(id).value.trim(); }
