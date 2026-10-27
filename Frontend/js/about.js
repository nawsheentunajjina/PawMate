var steps = [['See an animal in trouble', 'Open Pawmate. You do not need an account to report.'],
  ['Take a photo and send the report', 'Your location is added automatically.'],
  ['A volunteer nearby taps I\'ll help', 'The status changes to On the way.'],
  ['Treatment and updates', 'The volunteer treats the animal or takes it to a vet, then posts an update with a photo.']];
mount(topbar('How it works') + '<p>Pawmate connects people who see injured or sick street animals with volunteers nearby.</p>' +
  steps.map(function (s, i) { return '<article class="card"><div class="ico">' + (i + 1) + '</div><div class="grow"><strong>' + esc(s[0]) + '</strong><div class="muted">' + esc(s[1]) + '</div></div></article>'; }).join('') +
  '<div class="row"><h2>Who can do what</h2></div>' +
  '<ul class="tips"><li><strong>Guest:</strong> report an animal and view cases.</li><li><strong>User:</strong> everything a guest can, plus your own history.</li><li><strong>Volunteer:</strong> take cases and post updates. Needs an account.</li></ul>');
