mount(topbar('Notifications', 'profile.html') + '<div class="demo">Sample notifications. The backend will send real ones.</div>' +
  NOTIFS.map(function (n) { return '<article class="card"><div class="grow">' + esc(n.text) + '<div class="muted">' + ago(n.time) + '</div></div></article>'; }).join(''));
