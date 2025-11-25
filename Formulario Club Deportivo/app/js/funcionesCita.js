const formularioCita = document.getElementById('formularioCita')

formularioCita.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })

  const cliente = document.getElementById('cliente').value
  const servicio = document.getElementById('servicio').value
  const dia = document.getElementById('dia').value
  const hora = document.getElementById('hora').value

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/

  if (cliente.trim().length < 3 || !soloLetras.test(cliente.trim())) {
    document.getElementById('clienteError').innerText = 
      "Introduce un nombre válido."
  }

  if (servicio.trim().length < 3) {
    document.getElementById('servicioError').innerText = 
      "Selecciona una actividad válida."
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
        "La fecha debe ser posterior a hoy."
    }
  }

  if (!hora) {
    document.getElementById('horaError').innerText = 
      "Selecciona una hora."
  }
})
