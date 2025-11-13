const formularioNoticia = document.getElementById('formularioNoticia')

const textarea = document.getElementById('noticia')
const contador = document.getElementById('contador')

formularioNoticia.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })


//Obtener valores de los campos
const titulo = document.getElementById('titulo').value
const noticia = document.getElementById('noticia').value
const fecha = document.getElementById('fecha').value
const fechaError = document.getElementById('fechaError');
const imagen = document.getElementById('imagen')


//Expresiones regulares
const formatoFecha = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/

//Validaciones


    if (titulo.trim().length < 3) {
        document.getElementById('tituloError').innerText = "Introduce un titulo válido (mínimo 3)";  
    }

    if (noticia.trim().length < 3) {
        document.getElementById('noticiaError').innerText = "Introduce una noticia válido (mínimo 3)";  
    }

    if (!fecha) {
    fechaError.innerText = "Selecciona una fecha";
  } else {
    const [año, mes, dia] = fecha.split('-'); // convertir formato del input (YYYY-MM-DD)
    const fechaIngresada = new Date(año, mes - 1, dia);
    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);
    fechaIngresada.setHours(0, 0, 0, 0);

    if (fechaIngresada <= hoy) {
      fechaError.innerText = "La fecha debe ser posterior a hoy";
    } else {
      fechaError.innerText = "";
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

textarea.addEventListener('input', function(){
    contador.textContent = this.value.length
})