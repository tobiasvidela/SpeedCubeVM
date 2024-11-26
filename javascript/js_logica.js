const formularioContacto = document.getElementById('form-contacto');
const campoEdad = document.getElementById('edad');
const campoTelefono = document.getElementById('telefono');
const fechaInicioInput = document.querySelector("#fecha_inicio");
const fechaFinInput = document.querySelector("#fecha_fin");
const checkboxesCubos = document.querySelectorAll('input[name="tipos_cubos[]"]');
const seleccionarTodosLosCubos = document.querySelector('#seleccionar_todo');
const camposValidar = document.querySelectorAll('#nombre, #edad, #email, textarea');
const campoPregunta = document.querySelector('#tiempo_cubo');
const preguntaError = document.querySelector('.pregunta-error');
const edadError = document.querySelector('.edad-error');

/*    FUNCIONALIDAD     */
//  TELEFONO
function validarTelefono(telefono) {
  // Eliminar espacios y caracteres no numéricos
  const telefonoLimpio = telefono.replace(/\s+/g, '').replace(/[^\d]/g, '');
    
  // Validaciones
  const errores = [];
  
  // Verificar que solo contenga números
  if (!/^\d+$/.test(telefonoLimpio)) {
    errores.push('Solo se permiten números');
  }

  // Longitud entre 8 y 15 dígitos (rango típico internacional)
  if (telefonoLimpio.length < 8 || telefonoLimpio.length > 15) {
    errores.push('El número debe tener entre 8 y 15 dígitos');
  }

  return {
    valido: errores.length === 0,
    telefonoFormateado: telefonoLimpio,
    errores: errores
  };
}

function manejarValidacionTelefono(event) {  
  const campoTelefono = event.target;
  const resultadoValidacion = validarTelefono(campoTelefono.value);

  // Eliminar mensajes de error previos
  const errorAnterior = campoTelefono.parentNode.querySelector('.error-mensaje');
  if (errorAnterior) {
    errorAnterior.remove();
  }

  if (!resultadoValidacion.valido) {
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('error-mensaje');
    mensajeError.style.color = 'red';
    mensajeError.textContent = resultadoValidacion.errores[0];
    campoTelefono.parentNode.insertBefore(mensajeError, campoTelefono.nextSibling);
    campoTelefono.focus();
  } else {
    // campoTelefono.value = resultadoValidacion.telefonoFormateado;
  }

  return resultadoValidacion.valido;
}

//  FECHAS
function establecerFechaMinima() {
  // Obtener fecha estándar y eliminar la hora
  const hoy = new Date().toISOString().split('T')[0];
  fechaInicioInput.min = hoy;
  fechaFinInput.min = hoy;
}

function actualizarFechaInicio() {
  if (!fechaFinInput || !fechaInicioInput.value || new Date(fechaInicioInput.value) > new Date(fechaFinInput.value)) {
    fechaInicioInput.value = fechaFinInput.value;
  }
}

function actualizarFechaFin() {
  if (!fechaFinInput.value || !fechaInicioInput.value || new Date(fechaFinInput.value) < new Date(fechaInicioInput.value)) {
    fechaFinInput.value = fechaInicioInput.value;
  }
}

//  CHECKBOXES
function validarSeleccionCubos() {
  // Contar cuántos checkboxes están seleccionados
  const checkboxesSeleccionados = 
    Array.from(checkboxesCubos).filter(checkbox => checkbox.checked).length;

  return checkboxesSeleccionados >= 2;
}

function mostrarErrorCheckbox() {
  const checkboxContainer = document.querySelector('.checkbox-container');
  
  // Eliminar mensaje de error previo si existe
  const errorExistente = checkboxContainer.querySelector('.error-mensaje');
  if (errorExistente) {
    errorExistente.remove();
  }

  // Si no hay suficientes checkboxes seleccionados, mostrar mensaje
  if (!validarSeleccionCubos()) {
    const errorMensaje = document.createElement('p');
    errorMensaje.textContent = 'Debes seleccionar al menos 2 tipos de cubos';
    errorMensaje.classList.add('error-mensaje');
    errorMensaje.style.color = 'red';
    checkboxContainer.appendChild(errorMensaje);
    return false;
  }
  
  return true;
}

// VALIDAR CAMPOS
function validarCampo(campo) {
  // Eliminar espacios al inicio y final
  const valorTrimmed = campo.value.trim();

  if (valorTrimmed === '') {
    // Crear mensaje de error si no existe
    let errorMensaje = campo.nextElementSibling;
    if (!errorMensaje || !errorMensaje.classList.contains('error-mensaje')) {
      errorMensaje = document.createElement('p');
      errorMensaje.classList.add('error-mensaje');
      errorMensaje.style.color = 'red';
      campo.parentNode.insertBefore(errorMensaje, campo.nextSibling);
    }

    // Establecer mensaje de error específico según el tipo de campo
    switch(campo.id) {
      case 'nombre':
        errorMensaje.textContent = 'Por favor, ingresa tu nombre';
        break;
      case 'email':
        errorMensaje.textContent = 'Por favor, ingresa tu correo electrónico';
        break;
      case 'mensaje':
        errorMensaje.textContent = 'Por favor, escribe un mensaje';
        break;
      default:
        errorMensaje.textContent = 'Este campo no puede estar vacío';
    }

    // Establecer foco en el campo
    campo.focus();
    return false;
  } else {
    // Eliminar mensaje de error si existe
    const errorMensaje = campo.nextElementSibling;
    if (errorMensaje && errorMensaje.classList.contains('error-mensaje')) {
      errorMensaje.remove();
    }
    return true;
  }
}

function validarFormulario() {
  let formularioValido = true;

  // Validar cada campo obligatorio
  camposValidar.forEach(campo => {
    const campoValido = validarCampo(campo);
    if (!campoValido) {
      formularioValido = false;
    }
  });

  // Validar el campo de teléfono
  if (!manejarValidacionTelefono({ target: campoTelefono })) {
    formularioValido = false;
  }

  // Validar selección de cubos
  if (!mostrarErrorCheckbox()) {
    formularioValido = false;
  }

  // Validar fechas
  if (!fechaInicioInput.value || !fechaFinInput.value || new Date(fechaInicioInput.value) > new Date(fechaFinInput.value)) {
    const mensajeError = "Por favor, selecciona un rango de fechas válido";
    alert(mensajeError); // Puedes manejar esto mejor con mensajes visuales si prefieres
    formularioValido = false;
  }

  return formularioValido;
}

/* EVENTOS */
//  EDAD
campoEdad.addEventListener('input', function () {
  const valorEdad = parseInt(this.value, 10);
  edadError.textContent = '';

  if (isNaN(valorEdad) || valorEdad < 1 || valorEdad > 150) {
    edadError.textContent = 'Por favor, ingresa una edad válida (1-150).';
    edadError.style.color = 'red';
  }
});

// TELEFONO
campoTelefono.addEventListener('blur', manejarValidacionTelefono);

// FECHAS
fechaInicioInput.addEventListener('change', actualizarFechaFin);
fechaFinInput.addEventListener('change', actualizarFechaInicio);

// CHECKBOXES
seleccionarTodosLosCubos.addEventListener('change', function() {
  checkboxesCubos.forEach(checkbox => {
    checkbox.checked = this.checked;
  });
});

checkboxesCubos.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    seleccionarTodosLosCubos.checked = 
    Array.from(checkboxesCubos).every(cb => cb.checked);
  });
});

checkboxesCubos.forEach(checkbox => {
  checkbox.addEventListener('change', mostrarErrorCheckbox);
});

// CAMPOS Nombre, Edad, Email y Mensaje
camposValidar.forEach(campo => {
  campo.addEventListener('blur', function() {
    validarCampo(this);
  });
});

//  PREGUNTA
campoPregunta.addEventListener('input', function () {
  const valor = parseInt(this.value, 10);
  preguntaError.textContent = '';

  if (isNaN(valor) || valor < 0) {
    preguntaError.textContent = 'El valor debe ser un número mayor o igual a 0.';
    preguntaError.style.color = 'red';
  } else if (valor > 99) {
    preguntaError.textContent = 'El valor máximo permitido es 99.';
    preguntaError.style.color = 'red';
  }
});

// Mostrar mensaje al ususario cuando haga sumbit
formularioContacto.addEventListener("submit", function (e) {
  e.preventDefault();
  
  if (!validarFormulario()) {
    alert("Por favor, completa correctamente todos los campos requeridos antes de enviar el formulario.");
    return; // Detener el envío si hay errores
  }
  
  // Captura los valores del formulario
  const formData = {
    nombre: document.querySelector("#nombre").value,
    edad: document.querySelector("#edad").value,
    telefono: document.querySelector("#telefono").value,
    email: document.querySelector("#email").value,
    fechaInicio: (new Date(document.querySelector("#fecha_inicio").value + "T00:00:00")).toDateString().substring(4),
    fechaFin: (new Date(document.querySelector("#fecha_fin").value + "T00:00:00")).toDateString().substring(4),
    tiposCubos: Array.from(document.querySelectorAll("input[name='tipos_cubos[]']:checked")).map(checkbox => checkbox.value),
    nivel: Array.from(document.querySelector("#nivel").selectedOptions).map(option => option.value),
    mensaje: document.querySelector("#mensaje").value,
    tiempoCubo: parseInt(document.querySelector("#tiempo_cubo").value, 10),
  };

  let mensajePersonalizado = "";
  if (formData.tiempoCubo > formData.edad) {
    mensajePersonalizado = "🤔 Parece que conocías el cubo mágico antes de nacer. ¿Seguro que esto es correcto?";
  } else if (formData.tiempoCubo < 1) {
    mensajePersonalizado = "🆕 ¡Qué emoción! Parece que recién estás empezando tu viaje con el cubo mágico.";
  } else if (formData.tiempoCubo >= 10) {
    mensajePersonalizado = "🧙 ¡Impresionante! Con tantos años de experiencia, ¡debes ser todo un maestro del cubo mágico!";
  } else {
    mensajePersonalizado = "🚀 ¡Genial! ¡Tu entusiasmo por el cubo mágico está en pleno crecimiento!";
  }

  // Construir el mensaje para el alert
  const mensajeResumen = `
    🎉 ¡Formulario enviado con éxito! 🎉
    
    📛 Nombre: ${formData.nombre}
    🎂 Edad: ${formData.edad}
    📞 Teléfono: ${formData.telefono}
    📧 Email: ${formData.email}
    📅 Rango de fechas: ${formData.fechaInicio} a ${formData.fechaFin}
    🧩 Tipos de cubos: ${formData.tiposCubos.join(", ")}
    🏅 Niveles seleccionados: ${formData.nivel.join(", ")}
    ✉️ Mensaje: ${formData.mensaje}

    ${mensajePersonalizado}
  `;

  // Mostrar el mensaje al usuario
  alert(mensajeResumen);
});

/* INICIALIZACIONES */
establecerFechaMinima();
mostrarErrorCheckbox();