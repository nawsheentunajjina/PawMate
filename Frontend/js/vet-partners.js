var partners = VETS.filter(function (v) { return v.partner; });
mount(topbar('Vet partners') + '<div class="demo">Sample data. Real partners come from your own agreements.</div>' +
  '<p>Show your Pawmate case at a partner clinic to get the offer.</p>' +
  partners.map(function (v) {
    return '<article class="card"><div class="grow"><strong>' + esc(v.name) + '</strong> <span class="badge">Verified</span><div class="muted">' + esc(v.area) + '</div><div style="margin-top:4px">' + esc(v.discount) + '</div></div><a class="btn" href="tel:' + esc(v.phone) + '">Call</a></article>';
  }).join('') +
  '<div class="row"><h2>How to claim</h2></div><ul class="tips"><li>Open the case in Pawmate and show the case page at the clinic.</li><li>Ask for the Pawmate offer before treatment starts.</li><li>Post an update with a photo after treatment.</li></ul>');
