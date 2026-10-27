document.getElementById('form').onsubmit = async function (e) {
  e.preventDefault();
  var error = document.getElementById('error');
  error.textContent = '';
  var body = { email: document.getElementById('email').value.trim(), password: document.getElementById('pass').value };
  var r = await authRequest('login', body);

if (r.demo) {
  var users = load('pawmate_demo_users', {});
  var rec = users[body.email.toLowerCase()];

  if (!rec) {
    error.textContent = 'Account not found in demo mode. Please sign up again using this email.';
    return;
  }

  var du = {
    name: rec.name,
    email: body.email,
    role: rec.role || 'user'
  };

  saveUser(du, null);
  location.href = homeFor(du);
  return;
}

  if (!r.ok) { error.textContent = r.data.message; return; }
  saveUser(r.data.user, r.data.token);
  location.href = homeFor(r.data.user);
};
