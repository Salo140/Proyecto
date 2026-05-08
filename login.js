const roleButtons = document.querySelectorAll('.role-button');
const selectedRole = document.querySelector('#selectedRole');
const roleInfo = document.querySelector('#roleInfo');
const loginMessage = document.querySelector('#loginMessage');
const loginForm = document.querySelector('#loginForm');

const roleConfig = {
  cliente: {
    label: 'Cliente',
    info: 'Acceso para clientes que quieren gestionar su bienestar mental y sus recursos.',
    placeholder: 'ejemplo@correo.com',
    page: 'cliente.html',
    demo: 'cliente@ame.com',
    password: 'cliente123',
  },
  administrativo: {
    label: 'Administrativo',
    info: 'Acceso para personal administrativo encargado de gestionar usuarios y citas.',
    placeholder: 'usuario administrativo',
    page: 'administrativo.html',
    demo: 'admin@ame.com',
    password: 'admin123',
  },
  psicologos: {
    label: 'Psicólogos',
    info: 'Acceso para psicólogos que atienden clientes y coordinan su seguimiento.',
    placeholder: 'usuario profesional',
    page: 'psicologos.html',
    demo: 'psicologo@ame.com',
    password: 'psico123',
  },
};

const demoCredentials = document.querySelector('#demoCredentials');

function updateRole(role) {
  roleButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.role === role);
  });

  selectedRole.value = role;
  roleInfo.textContent = roleConfig[role].info;
  document.querySelector('#username').placeholder = roleConfig[role].placeholder;
  demoCredentials.textContent = `Cuenta de prueba: ${roleConfig[role].demo} | Contraseña: ${roleConfig[role].password}`;
  hideMessage();
}

function showMessage(text) {
  loginMessage.textContent = text;
  loginMessage.classList.remove('hidden');
}

function hideMessage() {
  loginMessage.textContent = '';
  loginMessage.classList.add('hidden');
}

roleButtons.forEach(button => {
  button.addEventListener('click', () => updateRole(button.dataset.role));
});

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const role = selectedRole.value;
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (!username || !password) {
    showMessage('Por favor completa usuario y contraseña para continuar.');
    return;
  }

  if (username !== roleConfig[role].demo || password !== roleConfig[role].password) {
    showMessage(`Usuario o contraseña incorrectos para ${roleConfig[role].label}. Usa los datos de prueba mostrados.`);
    return;
  }

  showMessage(`Bienvenido ${roleConfig[role].label}. Redirigiendo...`);
  setTimeout(() => {
    window.location.href = roleConfig[role].page;
  }, 600);
});

updateRole('cliente');
