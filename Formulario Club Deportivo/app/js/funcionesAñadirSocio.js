const formularioNuevoSocio = document.getElementById('formularioNuevoSocio');

formularioNuevoSocio.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasError = false; // <-- CONTROL REAL DE ERRORES

    // Limpiar errores anteriores
    let spanErrors = document.querySelectorAll('.error');
    spanErrors.forEach(span => span.innerText = "");

    // Valores del formulario
    const nombre = document.querySelector('input[name="nombre"]').value;
    const edad = document.querySelector('input[name="edad"]').value;
    const telefono = document.querySelector('input[name="telefono"]').value;
    const foto = document.querySelector('input[name="foto"]');

    // Expresiones regulares
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const telefonoEspaña = /^\d{9}$/;

    // =========================
    // VALIDACIONES
    // =========================

    // Validación nombre
    if (nombre.trim().length < 4 || nombre.trim().length > 50 || !soloLetras.test(nombre.trim())) {
        mostrarError('nombre', 'Nombre no válido');
        hasError = true;
    }

    // Validación edad
    if (!edad.trim() || Number(edad.trim()) < 18) {
        mostrarError('edad', 'Debes ser mayor de edad');
        hasError = true;
    }

    // Validación teléfono
    if (!telefonoEspaña.test(telefono.trim())) {
        mostrarError('telefono', 'Teléfono no válido (9 dígitos)');
        hasError = true;
    }

    // Validación foto
    let fotoErrores = comprobarImagen(foto);
    if (fotoErrores.length > 0) {
        fotoErrores.forEach(error => mostrarError('foto', error));
        hasError = true;
    }

    // =========================
    // ENVIAR FORMULARIO SI TODO ESTÁ CORRECTO
    // =========================
    if (!hasError) {
        formularioNuevoSocio.submit();
    }
});


// ===============================
// FUNCIÓN PARA MOSTRAR ERRORES
// ===============================
function mostrarError(campo, mensaje) {
    let input = document.querySelector(`input[name="${campo}"]`);
    let span = input.nextElementSibling;

    if (!span || !span.classList.contains('error')) {
        span = document.createElement('span');
        span.classList.add('error');
        input.parentNode.appendChild(span);
    }

    span.innerText = mensaje;
}


// ===============================
// VALIDACIÓN DE IMAGEN
// ===============================
function comprobarImagen(imagen) {
    let errores = [];

    if (imagen.files.length === 0) {
        errores.push("No has seleccionado ninguna imagen");
        return errores;
    }

    const archivo = imagen.files[0];

    // Validar extensión .jpg o .jpeg
    const nombreArchivo = archivo.name.toLowerCase();
    if (!nombreArchivo.endsWith('.jpg') && !nombreArchivo.endsWith('.jpeg')) {
        errores.push("La imagen debe ser un archivo JPG");
    }

    // Validar tipo MIME
    if (archivo.type !== 'image/jpeg') {
        errores.push("La imagen debe ser un JPEG válido");
    }

    // Tamaño máximo 5MB
    if (archivo.size > 5 * 1024 * 1024) {
        errores.push("La imagen es demasiado grande (máx 5MB)");
    }

    return errores;
}
