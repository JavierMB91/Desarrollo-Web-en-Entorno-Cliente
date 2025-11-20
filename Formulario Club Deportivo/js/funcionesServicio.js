const formularioServicio = document.getElementById('formulario-servicio')

formularioServicio.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => span.innerText = "")

    const nombre = document.getElementById('nombre').value
    const duracion = document.getElementById('duracion').value
    const precio = document.getElementById('precio').value

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    const soloMinutos = /^[0-9]+$/
    const soloNumeros = /^[0-9]+(\.[0-9]{1,2})?$/

    if (nombre.trim().length < 3 || nombre.trim().length > 50 || !soloLetras.test(nombre.trim())) {
        document.getElementById('nombreError').innerText = "Nombre no válido";  
    }

    if (Number(duracion.trim()) < 15 || !soloMinutos.test(duracion.trim())) {
        document.getElementById('duracionError').innerText = "Duración mínima 15 min";
    }

    if (!soloNumeros.test(precio.trim()) || Number(precio.trim()) <= 0) {
        document.getElementById('precioError').innerText = "Introduce un precio válido";
    }
})
