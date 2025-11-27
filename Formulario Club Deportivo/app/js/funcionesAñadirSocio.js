const formularioNuevoSocio = document.getElementById('formularioNuevoSocio');

formularioNuevoSocio.addEventListener('submit', (e) => {
    e.preventDefault();

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

    let hasError = false;

    // Validación nombre
    if (nombre.trim().length < 4 || nombre.trim().length > 50 || !soloLetras.test(nombre.trim())) {
        mostrarError('nombre', 'Nombre no válido');
        hasError = true;
    }

    // Validación edad
    if (Number(edad.trim()) < 18) {
        mostrarError('edad', 'Debes ser mayor de edad');
        hasError = true;
    }

    // Validación teléfono
    if (!telefonoEspaña.test(telefono.trim())) {
        mostrarError('telefono', 'Teléfono no válido');
        hasError = true;
    }

    // Validación foto
    let fotoErrores = comprobarImagen(foto);
    if (fotoErrores.length > 0) {
        fotoErrores.forEach(error => mostrarError('foto', error));
        hasError = true;
    }

    if (!hasError) {
        formularioNuevoSocio.submit(); // Enviar formulario si todo está correcto
    }
});

// Función para mostrar errores
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

// Función para validar imagen
function comprobarImagen(imagen) {
    let imagenError = [];

    if (imagen.files.length === 0) {
        imagenError.push("No has seleccionado ninguna imagen");
        return imagenError;
    }

    // Validar extensión .jpg o .jpeg
    const archivo = imagen.files[0].name.toLowerCase();
    if (!archivo.endsWith('.jpg') && !archivo.endsWith('.jpeg')) {
        imagenError.push("La imagen debe ser un archivo JPG");
    }

    // Validar tipo MIME también por seguridad
    if (imagen.files[0].type !== 'image/jpeg') {
        imagenError.push("La imagen debe ser un JPEG");
    }

    // Validar tamaño máximo
    if (imagen.files[0].size > 5 * 1024 * 1024) {
        imagenError.push("La imagen es demasiado grande (máx 5MB)");
    }

    return imagenError;
}