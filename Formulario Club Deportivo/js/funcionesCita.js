const formularioCita = document.getElementById('formularioCita')

formularioCita.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })

  // Obtener valores
  const cliente = document.getElementById('cliente').value
  const servicio = document.getElementById('servicio').value
  const dia = document.getElementById('dia').value
  const hora = document.getElementById('hora').value

  // Expresiones regulares
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/

  // Validaciones
  if (cliente.trim().length < 3 || !soloLetras.test(cliente.trim())) {
    document.getElementById('clienteError').innerText = 
      "Introduce un nombre válido (mínimo 3 letras, solo texto)."
  }

  if (servicio.trim().length < 3) {
    document.getElementById('servicioError').innerText = 
      "Introduce un servicio válido (mínimo 3 caracteres)."
  }

  if (!dia) {
    document.getElementById('diaError').innerText = "Selecciona una fecha.";
  } else {
    const fechaIngresada = new Date(dia)
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    fechaIngresada.setHours(0, 0, 0, 0)

    if (fechaIngresada <= hoy) {
      document.getElementById('diaError').innerText = 
        "La fecha debe ser posterior a la actual."
    }
  }

  if (!hora) {
    document.getElementById('horaError').innerText = 
      "Selecciona una hora."
  }
})