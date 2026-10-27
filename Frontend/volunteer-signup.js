var pos = null;
function v(id) { return document.getElementById(id).value.trim(); }

document.getElementById('locBtn').onclick = function () {
  var s = document.getElementById('locStatus');
  if (!navigator.geolocation) { s.textContent = 'Location is not available in this browser.'; return; }
  s.textContent = 'Finding your location...';
  navigator.geolocation.getCurrentPosition(function (p) {
    pos = { lat: p.coords.latitude, lng: p.coords.longitude };
    s.textContent = 'Location saved';
  }, function () { s.textContent = 'Could not get location. You can still continue.'; }, { timeout: 8000 });
};

document.getElementById('form').onsubmit = async function (e) {
  e.preventDefault();
  var error = document.getElementById('error');
  error.textContent = '';
  var body = {
    name: v('name'), email: v('email'), phone: v('phone'), password: document.getElementById('pass').value,
    role: 'volunteer', areaName: v('area'), lat: pos ? pos.lat : null, lng: pos ? pos.lng : null,
    radiusKm: Number(v('radius')), about: v('about')
  };
  var r = await authRequest('signup', body);
  if (r.demo) { // no backend yet: demo mode
    var users = load('pawmate_demo_users', {});
    users[body.email] = { name: body.name, role: 'volunteer' }; save('pawmate_demo_users', users);
    save('pawmate_profile', { phone: body.phone, radius: body.radiusKm });
    var du = { name: body.name, email: body.email, role: 'volunteer' };
    saveUser(du, null); location.href = homeFor(du); return;
  }
  if (!r.ok) { error.textContent = r.data.message; return; }
  saveUser(r.data.user, r.data.token);
  location.href = homeFor(r.data.user);
};