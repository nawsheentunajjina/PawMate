var tab = getRole() === 'volunteer' ? 'help' : 'mine';
function draw() {
  var list = getReports().filter(function (r) { return tab === 'mine' ? r.mine : r.helper === 'You'; });
  mount('<h1 class="page-h">My cases</h1><div class="chips" style="margin-bottom:14px">' +
    '<button class="chip" data-t="mine" aria-pressed="' + (tab === 'mine') + '">My reports</button>' +
    '<button class="chip" data-t="help" aria-pressed="' + (tab === 'help') + '">Cases I am helping</button></div>' +
    (list.length ? list.map(reportCard).join('') : empty(tab === 'mine' ? 'You have not reported any animal yet.' : 'You are not helping any case yet. Open the map and tap I\'ll help.')), 'cases');
  document.querySelectorAll('[data-t]').forEach(function (b) { b.onclick = function () { tab = b.dataset.t; draw(); }; });
}
draw();
