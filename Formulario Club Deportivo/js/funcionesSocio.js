const formularioSocio = document.getElementById('formularioSocio')

formularioSocio.addEventListener('submit', (e) => {
    e.preventDefault();
    //TODO limpiar los errores

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })

    //Obtener valores de los campos
    const nombre = document.getElementById('nombre').value
    const usuario = document.getElementById('usuario').value
    const edad = document.getElementById('edad').value
    const password = document.getElementById('password').value
    const telefono = document.getElementById('telefono').value
    const imagen = document.getElementById('imagen')
    //Expresiones regulares
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    const sinCaracteresEspeciales = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/
    const soloLetrasNumerosGuiones = /^[A-Za-z][A-Za-z0-9_]*$/
    const telefonoEspaña = /^\d{9}$/;

    //Validaciones

    if (nombre.trim().length < 4 || nombre.trim().length > 50 || !soloLetras.test(nombre.trim())) {
    document.getElementById('nombreError').innerText = "Introduce un nombre válido (mínimo 4 y máximo 50 caracteres que sean letras)";
    }

    if (usuario.trim().length < 5 || usuario.trim().length > 20 || !sinCaracteresEspeciales.test(usuario.trim())) {
    document.getElementById('usuarioError').innerText = "Introduce un usuario válido (mínimo 5 y máximo 20 caracteres, sin caracteres especiales)";
    }

    if (Number(edad.trim()) < 18) {
    document.getElementById('edadError').innerText = "Debes ser mayor de edad (18 años o más)";
    }

    if (password.trim().length < 8 || password.trim().length > 20 || !soloLetrasNumerosGuiones.test(password.trim())) {
    document.getElementById('passwordError').innerText = "Introduce una contraseña válida (mínimo 8 y máximo 20 caracteres, solo letras, números y guiones bajos, debe comenzar con una letra)";
    }

    if (!telefonoEspaña.test(telefono.trim())) {
    document.getElementById('telefonoError').innerText = "Introduce un teléfono válido (9 dígitos)";
    }else{
        const telefonoFinal = "+34" + telefono.trim()
        console.log(telefonoFinal)
    }

    let imagenError = comprobarImagen(imagen)
    imagenError.forEach(error => {
        document.getElementById('imagenError').innerHTML += `<p>${error}</p>`
    })
})

function comprobarImagen(imagen) {
    let imagenError = []

    if(imagen.files.length === 0) {
        imagenError.push("No has seleccionado ningúna imagen")
        return imagenError
    }

    if(imagen.files[0].type !== 'image/jpeg') {
        imagenError.push("La imagen debe ser un JPEG")
    }

    if(imagen.files[0].size > 5 * 1024 * 1024) {
        imagenError.push("La imagen es demasiado grande")
    }

    return imagenError
}