var u = getUser(), p = load('pawmate_profile', { phone: '', radius: 5 });
function draw() {
  var role = getRole();
  mount('<h1 class="page-h">Profile</h1>' +
    '<div class="card"><div class="thumb" style="border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 24px \'Familjen Grotesk\',sans-serif">' + esc((u ? u.name : 'G')[0].toUpperCase()) + '</div>' +
    '<div class="grow"><strong>' + esc(u ? u.name : 'Guest') + '</strong><div class="muted">' + (u ? esc(u.email) + ' · ' : 'Not signed in · ') + (role === 'volunteer' ? 'Volunteer' : 'User') + '</div></div></div>' +
    (u ? '' : '<div class="note">You can report animals without an account. Sign in to keep your history and to volunteer.</div><div class="grid2"><a class="btn" href="login.html">Log in</a><a class="btn" href="signup.html">Sign up</a></div>') +
    '<div class="row"><h2>Details</h2></div><form id="pf">' + field('phone', 'Phone', 'text') +
    (role === 'volunteer' ? '<div class="field"><label for="radius">How far can you travel to help?</label><select id="radius">' + [2, 5, 10, 20].map(function (k) { return '<option value="' + k + '"' + (Number(p.radius) === k ? ' selected' : '') + '>' + k + ' km</option>'; }).join('') + '</select></div>' : '') +
    '<button class="btn big" type="submit">Save</button></form>' +
    '<div class="row"><h2>Shortcuts</h2></div><div class="grid2">' + tile('my-cases.html', 'My cases', 'Reports and helping') + tile('notifications.html', 'Notifications', 'Updates') + '</div>' +
    (u ? '<p><button class="btn" id="out" type="button" style="background:var(--surface);border:1px solid var(--line)">Log out</button></p>' : ''), 'profile');
  document.getElementById('phone').value = p.phone || '';
  document.getElementById('pf').onsubmit = function (e) {
    e.preventDefault(); p.phone = val('phone'); var r = document.getElementById('radius'); if (r) p.radius = Number(r.value);
    save('pawmate_profile', p); alert('Saved');
  };
  var out = document.getElementById('out'); if (out) out.onclick = function () { logout(); location.href = 'index.html'; };
}
draw();
