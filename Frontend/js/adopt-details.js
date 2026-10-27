var id = Number(new URLSearchParams(location.search).get('id'));
var a = ADOPTIONS.find(function (x) { return x.id === id; });
function draw() {
  if (!a) { mount(topbar('Adoption', 'adoption.html') + empty('Animal not found.')); return; }
  var sent = load('pawmate_adopt_requests', []).some(function (r) { return r.animalId === id; });
  mount(topbar(a.name, 'adoption.html') + '<div class="ph"></div>' +
    '<p class="muted">' + esc(a.animal) + ' · ' + esc(a.gender) + ' · ' + esc(a.age) + ' · ' + esc(a.area) + ' · ' + (a.vaccinated ? 'Vaccinated' : 'Vaccine due') + '</p>' +
    '<div class="note">' + esc(a.story) + '</div>' +
    (sent ? '<div class="note">Your request is sent. The team will contact you.</div>' :
      '<h2 style="font:700 18px \'Familjen Grotesk\',sans-serif">Request to adopt</h2><form id="af">' + field('an', 'Your name') + field('ap', 'Phone') +
      '<div class="field"><label for="aw">Why do you want to adopt?</label><textarea id="aw"></textarea></div><button class="btn big" type="submit">Send request</button></form>'));
  var form = document.getElementById('af');
  if (form) form.onsubmit = function (e) {
    e.preventDefault();
    if (!val('an') || !val('ap')) { alert('Please add your name and phone.'); return; }
    var list = load('pawmate_adopt_requests', []);
    list.push({ animalId: id, name: val('an'), phone: val('ap'), why: val('aw'), createdAt: Date.now() });
    save('pawmate_adopt_requests', list); draw();
  };
}
draw();
