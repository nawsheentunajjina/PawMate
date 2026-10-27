// Shared helpers + demo data. Everything is saved in localStorage so the UI works without a backend.
// Later: replace getReports/saveReports with fetch() calls to your Express + MongoDB API.
var LABEL = { reported: 'Needs help', responding: 'On the way', treated: 'Treated', vet: 'Taken to vet' };
var PAW = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#F9876F" aria-hidden="true"><ellipse cx="7" cy="9" rx="2.2" ry="3"/><ellipse cx="12" cy="6.5" rx="2.2" ry="3"/><ellipse cx="17" cy="9" rx="2.2" ry="3"/><path d="M12 12c-3.5 0-6 3-6 5.2 0 1.8 1.6 2.6 3.2 2.3 1-.2 1.8-.5 2.8-.5s1.8.3 2.8.5c1.6.3 3.2-.5 3.2-2.3 0-2.2-2.5-5.2-6-5.2z"/></svg>';
var CAT = '<svg width="76" height="68" viewBox="0 0 72 64" aria-hidden="true"><path d="M10 28 L14 4 L30 16 Q36 14 42 16 L58 4 L62 28 Q66 52 36 58 Q6 52 10 28Z" fill="#1E1E1E"/><circle cx="26" cy="34" r="6" fill="#fff"/><circle cx="46" cy="34" r="6" fill="#fff"/><circle cx="27" cy="35" r="2.5" fill="#1E1E1E"/><circle cx="47" cy="35" r="2.5" fill="#1E1E1E"/><path d="M33 44h6l-3 3z" fill="#E38C92"/></svg>';

function seed() {
  var n = Date.now();
  return [
    { id: 1, animal: 'Dog', problem: 'Leg injury', note: 'Limping, near the tea stall. Looks scared but calm. Please bring a cloth or blanket if you can.', photo: null, lat: 23.8120, lng: 90.4140, status: 'reported', helper: null, createdAt: n - 12 * 60000, updates: [{ status: 'reported', note: 'Report created', createdAt: n - 12 * 60000 }] },
    { id: 2, animal: 'Cat', problem: 'Wounded paw', note: 'Under a parked rickshaw, not moving much.', photo: null, lat: 23.8070, lng: 90.4200, status: 'responding', helper: 'A volunteer', createdAt: n - 40 * 60000, updates: [{ status: 'reported', note: 'Report created', createdAt: n - 40 * 60000 }, { status: 'responding', note: 'A volunteer is on the way.', createdAt: n - 25 * 60000 }] },
    { id: 3, mine: true, animal: 'Dog', problem: 'Sick', note: 'Very weak, not eating.', photo: null, lat: 23.8160, lng: 90.4060, status: 'reported', helper: null, createdAt: n - 3 * 3600000, updates: [{ status: 'reported', note: 'Report created', createdAt: n - 3 * 3600000 }] }
  ];
}
function getReports() {
  try { var s = JSON.parse(localStorage.getItem('pawmate_reports')); if (Array.isArray(s)) return s; } catch (e) {}
  var d = seed(); saveReports(d); return d;
}
function saveReports(r) {
  try { localStorage.setItem('pawmate_reports', JSON.stringify(r)); } catch (e) { alert('Storage is full. Try a smaller photo.'); }
}
function getRole() { var u = getUser(); return u ? u.role : 'guest'; }
function setRole() {} // role now comes from the logged-in user
function homeFor(u) { return u && u.role === 'volunteer' ? 'dashboard.html' : 'index.html'; }
function requireRole(r) {
  if (getRole() !== r) { location.replace(getUser() ? 'index.html' : 'login.html'); return false; }
  return true;
}
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ago(ts) {
  var m = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (m < 60) return m + ' min ago';
  var h = Math.round(m / 60); if (h < 24) return h + ' h ago';
  return Math.round(h / 24) + ' d ago';
}
function distKm(a, b) {
  var R = 6371, rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
// Shrinks a photo so it fits in localStorage
function resizeImage(file, cb) {
  var reader = new FileReader();
  reader.onload = function () {
    var img = new Image();
    img.onload = function () {
      var s = Math.min(1, 600 / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = img.width * s; c.height = img.height * s;
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      cb(c.toDataURL('image/jpeg', 0.7));
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* ---- v2: storage helpers, auth helpers, demo data (ALL SAMPLE DATA) ---- */
function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { alert('Storage is full.'); } }
function getUser() { return load('pawmate_user', null); }
function saveUser(u, token) { save('pawmate_user', u); if (token) localStorage.setItem('pawmate_token', token); setRole(u.role); }
function logout() { localStorage.removeItem('pawmate_user'); localStorage.removeItem('pawmate_token'); }
// Tries the real backend. If the server or route is missing, returns {demo:true} so the UI still works.
async function authRequest(path, body) {
  try {
    var res = await fetch('/api/auth/' + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.status === 404) return { demo: true };
    return { ok: res.ok, data: await res.json() };
  } catch (e) { return { demo: true }; }
}

var VETS = [
  { id: 1, name: 'Green Paw Vet Clinic', area: 'Gulshan', phone: '01XXXXXXXXX', open24: true, hours: '', partner: true, discount: '20% off for Pawmate cases' },
  { id: 2, name: 'City Pet Care', area: 'Banani', phone: '01XXXXXXXXX', open24: false, hours: '9am - 9pm', partner: true, discount: 'Free first checkup' },
  { id: 3, name: 'Street Friends Animal Hospital', area: 'Mohakhali', phone: '01XXXXXXXXX', open24: true, hours: '', partner: false, discount: '' },
  { id: 4, name: 'Happy Tails Clinic', area: 'Badda', phone: '01XXXXXXXXX', open24: false, hours: '10am - 8pm', partner: true, discount: '15% off medicine' }
];
var CONTACTS = [
  { name: 'Nearest 24-hour vet', note: 'Add the number of a vet that is open at night', phone: '01XXXXXXXXX' },
  { name: 'Local animal rescue group', note: 'Add your local group here', phone: '01XXXXXXXXX' },
  { name: 'Animal bite or scratch', note: 'Wash with soap and running water for 15 minutes, then go to a hospital quickly', phone: '' },
  { name: 'Pawmate support', note: 'Report a problem with the app', phone: '' }
];
var ADOPTIONS = [
  { id: 1, name: 'Mishti', animal: 'Cat', age: '3 months', gender: 'Female', vaccinated: true, area: 'Gulshan', story: 'Found alone near a market. Playful and used to people.' },
  { id: 2, name: 'Bhulu', animal: 'Dog', age: '5 months', gender: 'Male', vaccinated: true, area: 'Banani', story: 'Gentle puppy, good with kids. Needs a home with some space.' },
  { id: 3, name: 'Tuni', animal: 'Cat', age: '2 months', gender: 'Female', vaccinated: false, area: 'Badda', story: 'Rescued kitten, first vaccine due soon.' },
  { id: 4, name: 'Kalu', animal: 'Dog', age: '1 year', gender: 'Male', vaccinated: true, area: 'Mohakhali', story: 'Calm and loyal. Healed well after a leg injury.' }
];
var FUNDS = [
  { id: 1, title: 'Surgery for a dog with a leg injury', goal: 5000, raised: 3200, story: 'Needs an X-ray and a small operation.' },
  { id: 2, title: 'Vaccines for 5 rescued kittens', goal: 2500, raised: 900, story: 'First round of vaccines and deworming.' },
  { id: 3, title: 'Winter blankets for street dogs', goal: 3000, raised: 1500, story: 'Old blankets and warm bedding for the cold weeks.' }
];
var LOSTFOUND = [
  { id: 1, type: 'lost', animal: 'Cat', desc: 'White cat with a grey tail, wearing a red collar.', area: 'Banani', contact: '01XXXXXXXXX', createdAt: Date.now() - 5 * 3600000 },
  { id: 2, type: 'found', animal: 'Dog', desc: 'Brown puppy found near the bus stop, very friendly.', area: 'Gulshan', contact: '01XXXXXXXXX', createdAt: Date.now() - 20 * 3600000 }
];
var FEEDING = [
  { id: 1, name: 'Park corner feeding spot', area: 'Gulshan', note: 'Water bowl and dry food, refilled in the evening', lat: 23.8110, lng: 90.4150 },
  { id: 2, name: 'Behind the tea stall', area: 'Banani', note: 'Leftover rice and water', lat: 23.8075, lng: 90.4180 },
  { id: 3, name: 'University gate', area: 'Badda', note: 'Students leave food here daily', lat: 23.8150, lng: 90.4070 }
];
var NOTIFS = [
  { text: 'A volunteer is on the way to your report.', time: Date.now() - 20 * 60000 },
  { text: 'Your report was marked as treated. Thank you!', time: Date.now() - 6 * 3600000 },
  { text: 'New case near you: Dog, leg injury.', time: Date.now() - 26 * 3600000 }
];
var ADMIN_USERS = [
  { name: 'Rafi', email: 'rafi@example.com', role: 'volunteer' },
  { name: 'Tania', email: 'tania@example.com', role: 'user' },
  { name: 'Sabbir', email: 'sabbir@example.com', role: 'volunteer' },
  { name: 'Mim', email: 'mim@example.com', role: 'user' }
];
