const formularioServicio = document.getElementById('formulario-servicio')

formularioServicio.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })


//Obtener valores de los campos
const nombre = document.getElementById('nombre').value
const duracion = document.getElementById('duracion').value
const precio = document.getElementById('precio').value

//Expresiones regulares
const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
const soloMinutos = /^[0-9]+$/
const soloNumeros = /^[0-9]+(\.[0-9]{1,2})?$/

//Validaciones


    if (nombre.trim().length < 3 || nombre.trim().length > 50 || !soloLetras.test(nombre.trim())) {
        document.getElementById('nombreError').innerText = "Introduce un nombre válido (mínimo 3 y máximo 50 caracteres)";  
    }

    if (Number(duracion.trim()) < 15 || !soloMinutos.test(duracion.trim())) {
        document.getElementById('duracionError').innerText = "La duración mínima es de 15 minutos";
    }

    if (!soloNumeros.test(precio.trim()) || Number(precio.trim()) <= 0) {
    document.getElementById('precioError').innerText = "Introduce un precio válido (número positivo)";
}

})