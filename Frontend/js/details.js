var id = Number(new URLSearchParams(location.search).get('id'));
var view = document.getElementById('view');
var upPhoto = null;

function render() {
  var reports = getReports(), r = reports.find(function (x) { return x.id === id; }), role = getRole();
  if (!r) { view.innerHTML = '<p>Case not found. <a href="index.html">Back to map</a></p>'; return; }
  var step = r.status === 'reported' ? 0 : r.status === 'responding' ? 1 : 2, open = step < 2, actions = '';
  if (role === 'volunteer' && r.status === 'reported') {
    actions = '<button class="btn big" id="helpBtn" type="button">I\'ll help this animal</button>';
  } else if (role === 'volunteer' && r.status === 'responding') {
    actions = '<div class="note"><div class="field"><label for="outcome">Update the case</label><select id="outcome"><option value="treated">Treated</option><option value="vet">Taken to vet</option></select></div>' +
      '<div class="field"><label for="upNote">Note</label><textarea id="upNote" placeholder="What did you do?"></textarea></div>' +
      '<div class="field"><label for="upFile">Photo (optional)</label><input type="file" id="upFile" accept="image/*"></div>' +
      '<button class="btn big" id="postBtn" type="button">Post update</button></div>';
  } else if (open && role !== 'volunteer') {
  actions = '<div class="note">Volunteers nearby can see this case. Want to help? <a href="signup.html">Sign up as a volunteer</a>.</div>';
  } else if (!open) {
    actions = '<div class="note">This case is closed. Thank you for helping.</div>';
  }
  var dots = ['Reported', 'Responding', 'Treated'].map(function (l, i) {
    return (i ? '<div class="line"></div>' : '') + '<div class="dot' + (i <= step ? ' on' : '') + '">' + (i + 1) + '</div>';
  }).join('');
  var tl = r.updates.slice().reverse().map(function (u) {
    return '<li><span class="d s-' + u.status + '" style="' + (u.status === 'treated' || u.status === 'vet' ? 'border:2px solid #E38C92' : '') + '"></span><div><strong>' + LABEL[u.status] + '</strong>' +
      '<div class="muted">' + esc(u.note) + ' · ' + ago(u.createdAt) + '</div>' +
      (u.photo ? '<img src="' + u.photo + '" alt="Update photo">' : '') + '</div></li>';
  }).join('');
  view.innerHTML =
    '<a class="back" href="index.html" aria-label="Back to map" style="position:absolute;top:20px;left:16px;z-index:2">&larr;</a>' +
    (r.photo ? '<img class="hero" src="' + r.photo + '" alt="Photo of the animal">' : '<div class="hero"></div>') +
    '<section class="sheet"><span class="status s-' + r.status + '" style="margin-top:0">' + LABEL[r.status] + '</span>' +
    '<h1>' + esc(r.animal) + ' · ' + esc(r.problem) + '</h1>' +
    '<div class="muted">' + distKm({ lat: 23.8103, lng: 90.4125 }, r).toFixed(1) + ' km away · reported ' + ago(r.createdAt) + '</div>' +
    '<div class="steps">' + dots + '</div>' +
    '<div class="steps-labels"><span>Reported</span><span>Responding</span><span>Treated</span></div>' +
    (r.note ? '<div class="note">' + esc(r.note) + '</div>' : '') + actions +
    '<h2>Updates</h2><ul class="timeline">' + tl + '</ul></section>';

  var help = document.getElementById('helpBtn');
  if (help) help.onclick = function () {
    r.status = 'responding'; r.helper = 'You';
    r.updates.push({ status: 'responding', note: 'A volunteer is on the way.', createdAt: Date.now() });
    saveReports(reports); render();
  };
  var file = document.getElementById('upFile');
  if (file) file.onchange = function (e) { if (e.target.files[0]) resizeImage(e.target.files[0], function (d) { upPhoto = d; }); };
  var post = document.getElementById('postBtn');
  if (post) post.onclick = function () {
    var s = document.getElementById('outcome').value, n = document.getElementById('upNote').value.trim();
    r.status = s;
    r.updates.push({ status: s, note: n || LABEL[s], photo: upPhoto, createdAt: Date.now() });
    upPhoto = null; saveReports(reports); render();
  };
}
render();
