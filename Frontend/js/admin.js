function draw() {
  var all = getReports();
  mount(topbar('Admin') + '<div class="demo">Demo screen. There is no admin check yet. The backend must only allow users with the admin role.</div>' +
    '<div class="grid2">' + statBox(ADMIN_USERS.length, 'Users') + statBox(all.length, 'Reports') + '</div>' +
    '<div class="row"><h2>Users</h2></div><div class="tblwrap"><table class="tbl"><tr><th>Name</th><th>Email</th><th>Role</th></tr>' +
    ADMIN_USERS.map(function (u) { return '<tr><td>' + esc(u.name) + '</td><td>' + esc(u.email) + '</td><td>' + esc(u.role) + '</td></tr>'; }).join('') + '</table></div>' +
    '<div class="row"><h2>Reports</h2></div><div class="tblwrap"><table class="tbl"><tr><th>Animal</th><th>Problem</th><th>Status</th><th></th></tr>' +
    all.map(function (r) { return '<tr><td>' + esc(r.animal) + '</td><td>' + esc(r.problem) + '</td><td>' + LABEL[r.status] + '</td><td><button class="link-btn" data-del="' + r.id + '">Delete</button></td></tr>'; }).join('') + '</table></div>');
  document.querySelectorAll('[data-del]').forEach(function (b) {
    b.onclick = function () {
      if (!confirm('Delete this report?')) return;
      saveReports(getReports().filter(function (r) { return r.id !== Number(b.dataset.del); })); draw();
    };
  });
}
draw();
