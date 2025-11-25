const formularioSocio = document.getElementById('formularioSocio')

formularioSocio.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => span.innerText = "")

    const nombre = document.getElementById('nombre').value
    const usuario = document.getElementById('usuario').value
    const edad = document.getElementById('edad').value
    const password = document.getElementById('password').value
    const telefono = document.getElementById('telefono').value
    const imagen = document.getElementById('imagen')

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    const sinCaracteresEspeciales = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/
    const soloLetrasNumerosGuiones = /^[A-Za-z][A-Za-z0-9_]*$/
    const telefonoEspaña = /^\d{9}$/;

    if (nombre.trim().length < 4 || nombre.trim().length > 50 || !soloLetras.test(nombre.trim())) {
        document.getElementById('nombreError').innerText = "Nombre no válido";
    }

    if (usuario.trim().length < 5 || usuario.trim().length > 20 || !sinCaracteresEspeciales.test(usuario.trim())) {
        document.getElementById('usuarioError').innerText = "Usuario no válido";
    }

    if (Number(edad.trim()) < 18) {
        document.getElementById('edadError').innerText = "Debes ser mayor de edad";
    }

    if (password.trim().length < 8 || password.trim().length > 20 || !soloLetrasNumerosGuiones.test(password.trim())) {
        document.getElementById('passwordError').innerText = "Contraseña no válida";
    }

    if (!telefonoEspaña.test(telefono.trim())) {
        document.getElementById('telefonoError').innerText = "Teléfono no válido";
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
