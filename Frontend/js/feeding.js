mount(topbar('Feeding points') + '<div id="map" class="map short" role="img" aria-label="Map of feeding points"></div>' +
  '<div class="row"><h2>Places to feed street animals</h2></div>' +
  FEEDING.map(function (f) { return '<article class="card"><div class="grow"><strong>' + esc(f.name) + '</strong><div class="muted">' + esc(f.area) + '</div><div>' + esc(f.note) + '</div></div></article>'; }).join(''));
var map = L.map('map', { zoomControl: false }).setView([FEEDING[0].lat, FEEDING[0].lng], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
FEEDING.forEach(function (f) {
  L.marker([f.lat, f.lng], { icon: L.divIcon({ className: '', html: '<span class="pin pin-responding"></span>', iconSize: [26, 26] }), title: f.name }).addTo(map);
});
