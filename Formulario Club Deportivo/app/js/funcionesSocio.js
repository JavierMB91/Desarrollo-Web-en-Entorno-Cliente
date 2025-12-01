const formularioSocio = document.getElementById('formularioSocio');

formularioSocio.addEventListener('submit', (e) => {
    e.preventDefault();

    // Resetear errores
    let spanErrors = document.querySelectorAll('.error');
    spanErrors.forEach(span => span.innerText = "");

    let hayErrores = false;

    const nombre = document.getElementById('nombre').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const edad = document.getElementById('edad').value.trim();
    const password = document.getElementById('password').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const imagen = document.getElementById('imagen');

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const sinCaracteresEspeciales = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/;
    const soloLetrasNumerosGuiones = /^[A-Za-z][A-Za-z0-9_]*$/;
    const telefonoEspaña = /^\d{9}$/;

    // Validaciones
    if (nombre.length < 4 || nombre.length > 50 || !soloLetras.test(nombre)) {
        document.getElementById('nombreError').innerText = "Nombre no válido";
        hayErrores = true;
    }

    if (usuario.length < 5 || usuario.length > 20 || !sinCaracteresEspeciales.test(usuario)) {
        document.getElementById('usuarioError').innerText = "Usuario no válido";
        hayErrores = true;
    }

    if (Number(edad) < 18) {
        document.getElementById('edadError').innerText = "Debes ser mayor de edad";
        hayErrores = true;
    }

    if (password.length < 8 || password.length > 20 || !soloLetrasNumerosGuiones.test(password)) {
        document.getElementById('passwordError').innerText = "Contraseña no válida";
        hayErrores = true;
    }

    if (!telefonoEspaña.test(telefono)) {
        document.getElementById('telefonoError').innerText = "Teléfono no válido";
        hayErrores = true;
    }

    // Validación imagen
    let imagenError = comprobarImagen(imagen);
    if (imagenError.length > 0) {
        hayErrores = true;
        let imagenErrorBox = document.getElementById('imagenError');
        imagenErrorBox.innerHTML = "";
        imagenError.forEach(error => {
            imagenErrorBox.innerHTML += `<p>${error}</p>`;
        });
    }

    // Si hay errores, no envío
    if (hayErrores) return;

    // Si todo correcto, enviar
    formularioSocio.submit();
});

function comprobarImagen(imagen) {
    let imagenError = [];

    if (imagen.files.length === 0) {
        imagenError.push("No has seleccionado ninguna imagen");
        return imagenError;
    }

    if (imagen.files[0].type !== 'image/jpeg') {
        imagenError.push("La imagen debe ser un JPEG");
    }

    if (imagen.files[0].size > 5 * 1024 * 1024) {
        imagenError.push("La imagen es demasiado grande");
    }

    return imagenError;
}
