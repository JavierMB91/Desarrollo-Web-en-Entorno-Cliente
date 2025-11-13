const formularioTestimonio = document.getElementById('formularioTestimonio')

//Expresiones regulares
const noVacio = /^\s*\S.*$/
const textarea = document.getElementById('testimonio')
const contador = document.getElementById('contador')

formularioTestimonio.addEventListener('submit', (e) => {
    e.preventDefault();
    //TODO limpiar los errores

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => {
        span.innerText = ""
    })

    //Obtener valores de campos
    const autor = document.getElementById('autor').value
    const testimonio = document.getElementById('testimonio').value




    if (!noVacio.test(autor.trim())) {
        document.getElementById('autorError').innerText = "No puede quedar el campo vacio";
        }

    if (!noVacio.test(testimonio.trim())) {
        document.getElementById('testimonioError').innerText = "No puede quedar el campo vacio";
        }
})

    //Validaciones
textarea.addEventListener('input', function(){
    contador.textContent = this.value.length
})
