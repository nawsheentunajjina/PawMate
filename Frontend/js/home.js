document.getElementById('paw').innerHTML = PAW;
document.getElementById('cat').innerHTML = CAT;
var me = { lat: 23.8103, lng: 90.4125 }; // default: Dhaka, replaced by your real location if allowed
var map = L.map('map', { zoomControl: false }).setView([me.lat, me.lng], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
var pins = L.layerGroup().addTo(map);

function render() {
  var role = getRole();

  var open = getReports().filter(function (r) { return r.status === 'reported' || r.status === 'responding'; });
  document.getElementById('helloSmall').textContent = role === 'volunteer' ? 'Hello, volunteer' : 'Hello';
  document.getElementById('helloBig').innerHTML = role === 'volunteer'
    ? open.length + ' animals need<br>help near you'
    : 'Spotted an animal<br>in trouble?';
  pins.clearLayers();
  open.forEach(function (r) {
    L.marker([r.lat, r.lng], {
      icon: L.divIcon({ className: '', html: '<span class="pin pin-' + r.status + '"></span>', iconSize: [26, 26] }),
      title: r.animal + ' - ' + r.problem
    }).on('click', function () { location.href = 'details.html?id=' + r.id; }).addTo(pins);
  });
  document.getElementById('list').innerHTML = open.length ? open.map(function (r) {
    var label = role === 'volunteer' && r.status === 'reported' ? "I'll help" : 'View';
    return '<article class="card">' +
      (r.photo ? '<img class="thumb" src="' + r.photo + '" alt="">' : '<div class="thumb"></div>') +
      '<div class="grow"><strong>' + esc(r.animal) + ' · ' + esc(r.problem) + '</strong>' +
      '<div class="muted">' + distKm(me, r).toFixed(1) + ' km away · ' + ago(r.createdAt) + '</div>' +
      '<span class="status s-' + r.status + '">' + LABEL[r.status] + '</span></div>' +
      '<a class="btn" href="details.html?id=' + r.id + '">' + label + '</a></article>';
  }).join('') : '<div class="empty">No open cases right now. If you see an animal in trouble, tap Report an animal.</div>';
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (p) {
    me = { lat: p.coords.latitude, lng: p.coords.longitude };
    map.setView([me.lat, me.lng], 14); render();
  }, function () {}, { timeout: 5000 });
}
render();

document.body.insertAdjacentHTML('beforeend', bottomNav('home'));
