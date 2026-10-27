mount(topbar('Emergency contacts') + '<div class="demo">Sample data. Add real numbers before you share the app.</div>' +
  CONTACTS.map(function (c) {
    return '<article class="card"><div class="grow"><strong>' + esc(c.name) + '</strong><div class="muted">' + esc(c.note) + '</div></div>' +
      (c.phone ? '<a class="btn" href="tel:' + esc(c.phone) + '">Call</a>' : '') + '</article>';
  }).join(''));
