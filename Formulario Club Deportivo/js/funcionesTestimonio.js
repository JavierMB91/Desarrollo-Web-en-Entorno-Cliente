const formularioTestimonio = document.getElementById('formularioTestimonio')

const noVacio = /^\s*\S.*$/
const textarea = document.getElementById('testimonio')
const contador = document.getElementById('contador')

formularioTestimonio.addEventListener('submit', (e) => {
    e.preventDefault();

    let spanErrors = document.querySelectorAll('.error')
    spanErrors.forEach(span => span.innerText = "")

    const autor = document.getElementById('autor').value
    const testimonio = document.getElementById('testimonio').value

    if (!noVacio.test(autor.trim())) {
        document.getElementById('autorError').innerText = "Campo obligatorio";
    }

    if (!noVacio.test(testimonio.trim())) {
        document.getElementById('testimonioError').innerText = "Campo obligatorio";
    }
})

textarea.addEventListener('input', function(){
    contador.textContent = this.value.length
})
