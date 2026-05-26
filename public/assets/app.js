// ── Configuración ──
const API_URL = 'http://localhost:3000/api/citas';

// ── Referencias al DOM ──
const formCita      = document.getElementById('formCita');
const btnAgregar    = document.getElementById('btnAgregar');
const tablaCitas    = document.getElementById('tablaCitas');
const cuerpoTabla   = document.getElementById('cuerpoTabla');
const mensajeTabla  = document.getElementById('mensajeTabla');
const mensajeDiv    = document.getElementById('mensaje');

// ── Campos del formulario ──
const inputCliente   = document.getElementById('inputCliente');
const inputPsicologo = document.getElementById('inputPsicologo');
const inputFecha     = document.getElementById('inputFecha');
const inputHora      = document.getElementById('inputHora');
const inputMotivo    = document.getElementById('inputMotivo');

// ── Errores del formulario ──
const errorCliente   = document.getElementById('errorCliente');
const errorPsicologo = document.getElementById('errorPsicologo');
const errorFecha     = document.getElementById('errorFecha');
const errorHora      = document.getElementById('errorHora');

// ────────────────────────────────────────────
// UTILIDADES
// ────────────────────────────────────────────

// Muestra un mensaje de éxito o error visible en pantalla (sin alert)
// y lo hace desaparecer automáticamente después de 4 segundos
let timerMensaje = null;
const mostrarMensaje = (texto, tipo = 'exito') => {
  mensajeDiv.textContent = texto;
  mensajeDiv.className   = `mensaje ${tipo}`;

  // Limpiar timer anterior si existía
  if (timerMensaje) clearTimeout(timerMensaje);

  // Desaparece solo después de 4 segundos
  timerMensaje = setTimeout(() => {
    mensajeDiv.className = 'mensaje oculto';
  }, 4000);
};

// Limpia los mensajes de error de cada campo del formulario
const limpiarErrores = () => {
  [inputCliente, inputPsicologo, inputFecha, inputHora].forEach(input => {
    input.classList.remove('invalido');
  });
  [errorCliente, errorPsicologo, errorFecha, errorHora].forEach(span => {
    span.textContent = '';
  });
};

// Valida los campos obligatorios y muestra errores sin alert()
const validarFormulario = () => {
  limpiarErrores();
  let valido = true;

  if (!inputCliente.value.trim()) {
    inputCliente.classList.add('invalido');
    errorCliente.textContent = 'El nombre del cliente es obligatorio.';
    valido = false;
  }
  if (!inputPsicologo.value.trim()) {
    inputPsicologo.classList.add('invalido');
    errorPsicologo.textContent = 'El nombre del psicólogo es obligatorio.';
    valido = false;
  }
  if (!inputFecha.value) {
    inputFecha.classList.add('invalido');
    errorFecha.textContent = 'La fecha es obligatoria.';
    valido = false;
  }
  if (!inputHora.value) {
    inputHora.classList.add('invalido');
    errorHora.textContent = 'La hora es obligatoria.';
    valido = false;
  }

  return valido;
};

// Limpia todos los campos del formulario
const limpiarFormulario = () => {
  inputCliente.value   = '';
  inputPsicologo.value = '';
  inputFecha.value     = '';
  inputHora.value      = '';
  inputMotivo.value    = '';
  limpiarErrores();
};

// ────────────────────────────────────────────
// GET — Cargar todas las citas
// ────────────────────────────────────────────
const cargarCitas = async () => {
  mensajeTabla.textContent = 'Cargando citas...';
  tablaCitas.classList.add('oculto');

  try {
    const response = await fetch(API_URL);

    // Verificamos respuesta.ok antes de procesar
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const citas = await response.json();
    renderizarTabla(citas);

  } catch (error) {
    // Error visible en pantalla, no solo en consola
    mensajeTabla.textContent = '⚠️ No se pudo conectar con la API. Asegúrate de tener el servidor corriendo en http://localhost:3000.';
    tablaCitas.classList.add('oculto');
    console.error('Error al cargar citas:', error);
  }
};

// ────────────────────────────────────────────
// RENDER — Dibuja la tabla con los datos
// ────────────────────────────────────────────
const renderizarTabla = (citas) => {
  if (!citas || citas.length === 0) {
    mensajeTabla.textContent = 'No hay citas registradas aún.';
    tablaCitas.classList.add('oculto');
    return;
  }

  mensajeTabla.textContent = '';
  tablaCitas.classList.remove('oculto');

  cuerpoTabla.innerHTML = citas.map(cita => `
    <tr id="fila-${cita.id}">
      <td>${cita.id}</td>
      <td>${cita.cliente}</td>
      <td>${cita.psicologo}</td>
      <td>${cita.fecha}</td>
      <td>${cita.hora}</td>
      <td>${cita.motivo || '—'}</td>
      <td>
        <span class="badge ${cita.disponible ? 'confirmada' : 'no-disponible'}">
          ${cita.disponible ? 'Confirmada' : 'No disponible'}
        </span>
      </td>
      <td class="acciones">
        <button
          class="btn btn-toggle ${cita.disponible ? '' : 'no-disp'}"
          onclick="cambiarDisponibilidad(${cita.id}, ${cita.disponible})">
          ${cita.disponible ? '🔒 Deshabilitar' : '✅ Habilitar'}
        </button>
        <button
          class="btn btn-eliminar"
          onclick="eliminarCita(${cita.id}, '${cita.cliente}')">
          🗑️ Eliminar
        </button>
      </td>
    </tr>
  `).join('');
};

// ────────────────────────────────────────────
// POST — Crear nueva cita
// ────────────────────────────────────────────
formCita.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  if (!validarFormulario()) return;

  // Deshabilitar botón mientras la petición está en curso
  btnAgregar.disabled     = true;
  btnAgregar.textContent  = 'Guardando...';

  try {
    const response = await fetch(API_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' }, // obligatorio para que req.body funcione
      body: JSON.stringify({
        cliente:   inputCliente.value.trim(),
        psicologo: inputPsicologo.value.trim(),
        fecha:     inputFecha.value,
        hora:      inputHora.value,
        motivo:    inputMotivo.value.trim()
      })
    });

    if (!response.ok) {
      const datos = await response.json();
      throw new Error(datos.error || 'Error al crear la cita.');
    }

    // Limpiar formulario y recargar tabla sin recargar la página
    limpiarFormulario();
    mostrarMensaje('✅ Cita creada correctamente.');
    await cargarCitas();

  } catch (error) {
    mostrarMensaje(`❌ ${error.message}`, 'error');
    console.error('Error al crear cita:', error);
  } finally {
    // Siempre se vuelve a habilitar el botón
    btnAgregar.disabled    = false;
    btnAgregar.textContent = 'Agregar cita';
  }
});

// ────────────────────────────────────────────
// PUT — Cambiar disponibilidad
// ────────────────────────────────────────────
const cambiarDisponibilidad = async (id, disponibleActual) => {
  try {
    // Primero obtenemos los datos completos de la cita
    const responseGet = await fetch(`${API_URL}/${id}`);
    if (!responseGet.ok) throw new Error('No se encontró la cita.');

    const cita = await responseGet.json();

    // Enviamos todos los datos + disponible invertido
    const response = await fetch(`${API_URL}/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente:    cita.cliente,
        psicologo:  cita.psicologo,
        fecha:      cita.fecha,
        hora:       cita.hora,
        motivo:     cita.motivo,
        disponible: !disponibleActual  // invertimos el valor actual
      })
    });

    if (!response.ok) throw new Error('Error al actualizar la cita.');

    mostrarMensaje(`✅ Disponibilidad actualizada correctamente.`);
    await cargarCitas(); // Actualiza la interfaz sin recargar la página

  } catch (error) {
    mostrarMensaje(`❌ ${error.message}`, 'error');
    console.error('Error al actualizar:', error);
  }
};

// ────────────────────────────────────────────
// DELETE — Eliminar cita
// ────────────────────────────────────────────
const eliminarCita = async (id, nombreCliente) => {
  // Confirmación antes de eliminar
  const confirmado = confirm(`¿Estás seguro de que quieres eliminar la cita de ${nombreCliente}?`);
  if (!confirmado) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    // DELETE exitoso devuelve 204 (sin contenido), también es ok
    if (!response.ok && response.status !== 204) {
      throw new Error('Error al eliminar la cita.');
    }

    mostrarMensaje(`✅ Cita de ${nombreCliente} eliminada correctamente.`);
    await cargarCitas(); // Actualiza la lista sin recargar la página

  } catch (error) {
    mostrarMensaje(`❌ ${error.message}`, 'error');
    console.error('Error al eliminar:', error);
  }
};

// ────────────────────────────────────────────
// INICIO — Cargar citas al abrir la página
// ────────────────────────────────────────────
cargarCitas();