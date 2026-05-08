const apiUrl = 'http://localhost:3000/api/citas';
const citasList = document.querySelector('#citasList');
const citasMessage = document.querySelector('#citasMessage');
const bodyRole = document.body.dataset.role;
const clienteName = document.body.dataset.cliente;
const psicologoName = document.body.dataset.psicologo;

const roleLabels = {
  cliente: 'cliente',
  administrativo: 'administrativo',
  psicologos: 'psicólogo'
};

const filterCitas = citas => {
  if (bodyRole === 'cliente' && clienteName) {
    return citas.filter(cita => cita.cliente === clienteName);
  }

  if (bodyRole === 'psicologos' && psicologoName) {
    return citas.filter(cita => cita.psicologo === psicologoName);
  }

  return citas;
};

const createCitaCard = cita => {
  const item = document.createElement('li');
  item.className = 'cita-card';
  item.innerHTML = `
    <strong>${cita.cliente} - ${cita.psicologo}</strong>
    <span><strong>Fecha:</strong> ${cita.fecha}</span>
    <span><strong>Hora:</strong> ${cita.hora}</span>
    <span><strong>Motivo:</strong> ${cita.motivo || 'No especificado'}</span>
    <span><strong>Estado:</strong> ${cita.disponible ? 'Confirmada' : 'No disponible'}</span>
  `;
  return item;
};

const renderCitas = citas => {
  citasList.innerHTML = '';
  if (!citas || citas.length === 0) {
    citasMessage.textContent = 'No hay citas disponibles para este perfil en este momento.';
    return;
  }

  citas.forEach(cita => citasList.appendChild(createCitaCard(cita)));
  citasMessage.textContent = `Mostrando ${citas.length} cita(s) para el perfil ${roleLabels[bodyRole] || 'seleccionado'}.`;
};

const loadCitas = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('No se pudo cargar la API de citas.');
    }

    const citas = await response.json();
    renderCitas(filterCitas(citas));
  } catch (error) {
    citasList.innerHTML = '';
    citasMessage.textContent = 'Error al cargar las citas. Asegúrate de tener la API corriendo en http://localhost:3000.';
    console.error(error);
  }
};

loadCitas();
