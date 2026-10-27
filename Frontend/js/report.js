var photo = null, pos = { lat: 23.8103, lng: 90.4125 };
document.querySelectorAll('.chips').forEach(function (g) {
  g.querySelectorAll('.chip').forEach(function (b) {
    b.onclick = function () {
      g.querySelectorAll('.chip').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
    };
  });
});
function chosen(group) { return document.querySelector('[data-group=' + group + '] [aria-pressed=true]').textContent; }
document.getElementById('photo').onchange = function (e) {
  if (!e.target.files[0]) return;
  resizeImage(e.target.files[0], function (d) {
    photo = d;
    document.getElementById('photoHint').innerHTML = '<img src="' + d + '" alt="Selected photo preview">';
  });
};
function locate() {
  var t = document.getElementById('locTitle');
  t.textContent = 'Finding your location...';
  if (!navigator.geolocation) { t.textContent = 'Using default location (Dhaka)'; return; }
  navigator.geolocation.getCurrentPosition(function (p) {
    pos = { lat: p.coords.latitude, lng: p.coords.longitude };
    t.textContent = 'Current location found';
  }, function () { t.textContent = 'Using default location (Dhaka)'; }, { timeout: 8000 });
}
document.getElementById('locBtn').onclick = locate;
locate();
document.getElementById('form').onsubmit = function (e) {
  e.preventDefault();
  var now = Date.now(), reports = getReports();
  var r = {
    id: now, animal: chosen('animal'), problem: chosen('problem'),
    note: document.getElementById('note').value.trim(), photo: photo, guestPhone: document.getElementById('phone').value.trim(), mine: true,
    lat: pos.lat, lng: pos.lng, status: 'reported', helper: null, createdAt: now,
    updates: [{ status: 'reported', note: 'Report created', createdAt: now }]
  };
  reports.unshift(r); saveReports(reports);
  location.href = 'details.html?id=' + r.id;
};
