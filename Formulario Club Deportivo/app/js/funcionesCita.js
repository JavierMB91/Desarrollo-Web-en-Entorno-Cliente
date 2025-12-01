const formularioCita = document.getElementById('formularioCita')

formularioCita.addEventListener('submit', (e) => {
    e.preventDefault();

    let errores = false;

    let spanErrors = document.querySelectorAll('.error');
    spanErrors.forEach(span => {
        span.innerText = "";
    });

    const cliente = document.getElementById('cliente').value;
    const servicio = document.getElementById('servicio').value;
    const dia = document.getElementById('dia').value;
    const hora = document.getElementById('hora').value;

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    // VALIDACIÓN NOMBRE
    if (cliente.trim().length < 3 || !soloLetras.test(cliente.trim())) {
        document.getElementById('clienteError').innerText = "Introduce un nombre válido.";
        errores = true;
    }

    // VALIDACIÓN SERVICIO
    if (servicio.trim().length < 3) {
        document.getElementById('servicioError').innerText = "Selecciona una actividad válida.";
        errores = true;
    }

    // VALIDACIÓN FECHA
    if (!dia) {
        document.getElementById('diaError').innerText = "Selecciona una fecha.";
        errores = true;
    } else {
        const fechaIngresada = new Date(dia);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        fechaIngresada.setHours(0, 0, 0, 0);

        if (fechaIngresada <= hoy) {
            document.getElementById('diaError').innerText = "La fecha debe ser posterior a hoy.";
            errores = true;
        }
    }

    // VALIDACIÓN HORA
    if (!hora) {
        document.getElementById('horaError').innerText = "Selecciona una hora.";
        errores = true;
    }

    // SI HAY ERRORES → BLOQUEA
    if (errores) {
        return;
    }

    // SI TODO ESTÁ BIEN → ENVÍA FORMULARIO
    formularioCita.submit();
});
