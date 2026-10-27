document.getElementById('form').onsubmit = async function (e) {
  e.preventDefault();
  var error = document.getElementById('error');
  error.textContent = '';
  var body = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim().toLowerCase(),
    phone: document.getElementById('phone').value.trim(),
    password: document.getElementById('pass').value,
    role: 'user'
  };
  var r = await authRequest('signup', body);
  if (r.demo) {
  var users = load('pawmate_demo_users', {});

  users[body.email] = {
    name: body.name,
    email: body.email,
    role: body.role
  };

  save('pawmate_demo_users', users);

  var du = {
    name: body.name,
    email: body.email,
    role: body.role
  };

  saveUser(du, null);
  location.href = homeFor(du);
  return;
}

  if (!r.ok) { error.textContent = r.data.message; return; }
  saveUser(r.data.user, r.data.token);
  location.href = homeFor(r.data.user);
};