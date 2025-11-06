const formulario = document.getElementById('formulario')

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log(e)
    //TODO limpiar los errores

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })

    const nombre = document.getElementById('nombre').value
    const acepto = document.getElementById('acepto').checked
    const mayor = document.getElementById('mayor').checked
    const opciones = document.getElementById('opciones').value
    const numero = document.getElementById('numero').value
    const archivo = document.getElementById('archivo')
    const telefono = document.getElementById('telefono').value
    const regex = /^[67]\d{8}$/

    //comprobar que hay algo escrito en nombre y que tiene más de 3 caracteres
    if(nombre.trim() < 3) {
        document.getElementById('nombreError').innerText = "Introduce un nombre válido que tenga al menos 3 caracteres"
    }

    if(!acepto) {
        document.getElementById('aceptoError').innerHTML = "Tienes que aceptar las políticas de privacidad"
    }

    if(!mayor) {
        document.getElementById('edadError').innerHTML = "Tienes que ser mayor de 18 años"
    }

    if(opciones === "") {
        document.getElementById('opcionesError').innerHTML = "Selecciona una opción"
    }

    if(numero > 1 || numero < 100 || numero.trim === "") {
        document.getElementById('numeroError').innerHTML = "Introduce un numero correcto"
    }

    if(!regex.test(telefono.trim())){
        document.getElementById('telefonoError').innerHTML = "El teléfono debe comenzar por 6 o 7"
    }

    let erroresArchivo = comprobarArchivo(archivo)
    erroresArchivo.forEach(error => {
        document.getElementById('archivoError').innerHTML += `<p>${error}</p>`
    })


    //Si no hay errores envio el formulario
    if(!errores) {
        formulario.submit()
    }
    
})

function comprobarArchivo(archivo) {
    let erroresArchivo = []

    if(archivo.files.length === 0) {
        erroresArchivo.push("No has seleccionado ningún archivo")
        return erroresArchivo
    }

    if(archivo.files[0].type !== 'application/pdf') {
        erroresArchivo.push("El archivo debe ser un pdf")
    }

    if(archivo.files[0].size > 2 * 1024 * 1024) {
        erroresArchivo.push("El archivo es demasiado grande")
    }

    return erroresArchivo
}