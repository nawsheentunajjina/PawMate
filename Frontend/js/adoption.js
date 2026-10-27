var f = 'All';
function draw() {
  var list = ADOPTIONS.filter(function (a) { return f === 'All' || a.animal === f; });
  mount(topbar('Adoption') + '<div class="chips" style="margin-bottom:14px">' + ['All', 'Dog', 'Cat'].map(function (x) { return '<button class="chip" data-f="' + x + '" aria-pressed="' + (f === x) + '">' + x + '</button>'; }).join('') + '</div>' +
    list.map(function (a) {
      return '<article class="card"><div class="thumb"></div><div class="grow"><strong>' + esc(a.name) + '</strong><div class="muted">' + esc(a.animal) + ' · ' + esc(a.age) + ' · ' + esc(a.area) + '</div>' +
        '<span class="badge">' + (a.vaccinated ? 'Vaccinated' : 'Vaccine due') + '</span></div><a class="btn" href="adopt-details.html?id=' + a.id + '">View</a></article>';
    }).join(''));
  document.querySelectorAll('[data-f]').forEach(function (b) { b.onclick = function () { f = b.dataset.f; draw(); }; });
}
draw();
