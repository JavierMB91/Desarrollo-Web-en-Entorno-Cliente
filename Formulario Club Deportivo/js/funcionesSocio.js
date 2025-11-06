const formularioSocio = document.getElementById('formularioSocio')

formularioSocio.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log(e)
    //TODO limpiar los errores

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })

    const nombre = document.getElementById('nombre').value
    const usuario = document.getElementById('usuario').value
    const edad = document.getElementById('edad').value
    const password = document.getElementById('password').value
    const telefono = document.getElementById('telefono').value
    const imagen = document.getElementById('imagen')
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    const sinCaracteresEspeciales = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/

    if (nombre.trim().length < 4 || nombre.trim().length > 50 || !soloLetras.test(nombre)) {
    document.getElementById('nombreError').innerText = "Introduce un nombre válido (mínimo 4 y máximo 50 caracteres que sean letras)";
    }

    if (usuario.trim().length < 5 || usuario.trim().length > 20 || !sinCaracteresEspeciales.test(usuario)) {
    document.getElementById('usuarioError').innerText = "Introduce un usuario válido (mínimo 5 y máximo 20 caracteres, sin caracteres especiales)";
    }
})