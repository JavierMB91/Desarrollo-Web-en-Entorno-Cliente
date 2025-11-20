const formularioNoticia = document.getElementById('formularioNoticia')

const textarea = document.getElementById('noticia')
const contador = document.getElementById('contador')

formularioNoticia.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => span.innerText = "")

    const titulo = document.getElementById('titulo').value
    const noticia = document.getElementById('noticia').value
    const fecha = document.getElementById('fecha').value
    const fechaError = document.getElementById('fechaError');
    const imagen = document.getElementById('imagen')

    if (titulo.trim().length < 3) {
        document.getElementById('tituloError').innerText = "Título demasiado corto.";  
    }

    if (noticia.trim().length < 3) {
        document.getElementById('noticiaError').innerText = "Escribe un contenido válido.";  
    }

    if (!fecha) {
        fechaError.innerText = "Selecciona una fecha";
    } else {
        const [año, mes, dia] = fecha.split('-');
        const fechaIngresada = new Date(año, mes - 1, dia);
        const hoy = new Date();

        hoy.setHours(0,0,0,0);
        fechaIngresada.setHours(0,0,0,0);

        if (fechaIngresada <= hoy) {
            fechaError.innerText = "Debe ser una fecha futura.";
        }
    }

    let imagenError = comprobarImagen(imagen)
    imagenError.forEach(error => {
        document.getElementById('imagenError').innerHTML += `<p>${error}</p>`
    })
})

function comprobarImagen(imagen) {
    let imagenError = []

    if(imagen.files.length === 0) {
        imagenError.push("No seleccionaste ninguna imagen")
        return imagenError
    }

    if(imagen.files[0].type !== 'image/jpeg') {
        imagenError.push("La imagen debe ser JPEG")
    }

    if(imagen.files[0].size > 5 * 1024 * 1024) {
        imagenError.push("La imagen es demasiado grande")
    }

    return imagenError
}

textarea.addEventListener('input', function(){
    contador.textContent = this.value.length
})
