//crear array para guardar las tareas
let listaDeTareas = []
let contadorTareas = 0

//recuperar las tareas de localstorage
if(localStorage.getItem('tareasGuardadas') !== null){
    listaDeTareas = JSON.parse(localStorage.getItem('tareasGuardadas'))
    listaDeTareas.forEach(item => {
        displayTarea(item)
        if(item.id > contadorTareas) {
            contadorTareas = item.id + 1
        }
    });
}
//mostrarlas


//seleccionar el elemento para crear una nueva tarea
document.getElementById('agregar').addEventListener('click', crearTarea)

function crearTarea(){
    //leer los datos del input
    let textoTarea = document.getElementById('inputTarea').value
    let tipoTarea = document.getElementById('tipoTarea').value

    //comprobar que hay texto en el input

    if(textoTarea.trim() === '') {
        document.getElementById('errorTarea').textContent = 'Debes escribir una tarea'
        return
    }

    //si Llegamos aqui, hay algo escrito, borramos el texto de error
    document.getElementById('errorTarea').textContent = ''

    //crear un objeto para guardar la tarea
    const tarea = {
        id: contadorTareas,
        texto: textoTarea,
        tipo: tipoTarea,
        tareaRealizada: false
    }

    contadorTareas++


    //añadimos la tarea al array
    listaDeTareas = [tarea, ...listaDeTareas]

    //guardar el array de tareas en el navegador
    localStorage.setItem('tareasGuardadas', JSON.stringify(listaDeTareas))

    displayTarea(tarea)
}

function displayTarea(tarea){
    let iconoTipo = '🟩'
    if(tarea.tipo === 'opcional') {
        iconoTipo = '🟧'
    } else if (tarea.tipo === 'urgente') {
        iconoTipo = '🟥'
    }


    //crear un nodo para la tarea
    const li = document.createElement('li')

    li.innerHTML = `
        <div data-id="${tarea.id}">
            <input type="checkbox" class="tarea-realizada">
            ${iconoTipo}
            <span class="texto-tarea">${tarea.texto}</span>
            <button class="eliminar">🗑️</button>
        </div>
    `


    //mostrar la tarea segun este realizada o no
    if(tarea.tareaRealizada) {
        li.querySelector('.texto-tarea').style.textDecoration = "line-through"
        li.querySelector('.tarea-realizada').checked = true
    }

    //crear los eventos
    //eliminar tarea
    li.querySelector('.eliminar').addEventListener('click', function() {
        //averiguar que id tiene la tarea
        let id = li.querySelector('div').getAttribute('data-id')
        //eliminar la tarea del array
        //filter devuelve un array con todos los elementos que cumplen la condicion
        //en este caso devuelve un array con  todas las tareas menos la que queremos eliminar
        listaDeTareas = listaDeTareas.filter(item => item.id != id)

        localStorage.setItem('tareasGuardadas', JSON.stringify(listaDeTareas))
        //eliminar la tarea de la pantalla
        li.remove()
    })

    //añade un evento al checkbox para marcar la tarea como realizada o no
    li.querySelector('.tarea-realizada').addEventListener('click', function() {
        //comprueba si la casilla esta seleccionada
        if(li.querySelector('.tarea-realizada').checked === true) {
            li.querySelector('.texto-tarea').style.textDecoration = "line-through"
            tarea.tareaRealizada = true
        }else{
            li.querySelector('.texto-tarea').style.textDecoration = "none"
            tarea.tareaRealizada = false
        }
        localStorage.setItem('tareasGuardadas', JSON.stringify(listaDeTareas))
    })


    //añadir el elemento a la lista
    document.getElementById('listado').appendChild(li)

    document.getElementById('inputTarea').value = ''
}


//evento para filtrar las tareas que se muestran
const listaFiltros = Array.from(document.getElementsByClassName('filtro'))
listaFiltros.forEach(filtro => {
    filtro.addEventListener('click', (e) => {
        filtro = e.target.id

        listaDeTareas.forEach(tarea => {
            //seleccionar la tarea en el DOM usando su id
            const elementoTarea = document.querySelector(`[data-id="${tarea.id}"]`).parentElement
            if(tarea.tipo === filtro || filtro === 'todas'){
                //mostrar tarea
                elementoTarea.style.display = "flex"
            }else{
                //ocultar tarea
                elementoTarea.style.display = "none"
            }
        })
    })
})