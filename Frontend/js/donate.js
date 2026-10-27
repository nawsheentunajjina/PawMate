var funds = load('pawmate_funds', FUNDS), openId = null, amt = 500;
function draw() {
  mount(topbar('Donate') + '<div class="demo">Demo only. No real payment happens. The backend will record bKash/Nagad transaction IDs for admin to verify.</div>' +
    funds.map(function (f) {
      var pct = Math.min(100, Math.round(f.raised / f.goal * 100));
      return '<article class="note"><strong>' + esc(f.title) + '</strong><div class="muted">' + esc(f.story) + '</div>' +
        '<div class="bar" style="margin:10px 0 4px"><i style="width:' + pct + '%"></i></div><div class="muted">৳' + f.raised + ' of ৳' + f.goal + ' (' + pct + '%)</div>' +
        (openId === f.id ?
          '<form data-id="' + f.id + '" style="margin-top:12px"><div class="chips" style="margin-bottom:12px">' + [100, 500, 1000].map(function (x) { return '<button type="button" class="chip" data-a="' + x + '" aria-pressed="' + (amt === x) + '">৳' + x + '</button>'; }).join('') + '</div>' +
          '<div class="field"><label for="m">Method</label><select id="m"><option>bKash</option><option>Nagad</option></select></div>' + field('tx', 'Transaction ID') +
          '<button class="btn big" type="submit">Send donation</button></form>' :
          '<p style="margin:12px 0 0"><button class="btn" data-open="' + f.id + '" type="button">Donate</button></p>') + '</article>';
    }).join(''));
  document.querySelectorAll('[data-open]').forEach(function (b) { b.onclick = function () { openId = Number(b.dataset.open); draw(); }; });
  document.querySelectorAll('[data-a]').forEach(function (b) { b.onclick = function () { amt = Number(b.dataset.a); draw(); }; });
  var form = document.querySelector('form[data-id]');
  if (form) form.onsubmit = function (e) {
    e.preventDefault();
    if (!val('tx')) { alert('Please add the transaction ID.'); return; }
    var f = funds.find(function (x) { return x.id === Number(form.dataset.id); });
    f.raised += amt; save('pawmate_funds', funds);
    var d = load('pawmate_donations', []); d.push({ fundId: f.id, amount: amt, method: val('m'), tx: val('tx'), createdAt: Date.now() }); save('pawmate_donations', d);
    openId = null; draw();
  };
}
draw();
