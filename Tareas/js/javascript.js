//enlace a los elementos html

const lista_input = document.getElementById('tarea-input');
const boton = document.getElementById('add-button');
const lista_tareas = document.getElementById('lista-tareas');


//añadir evento al boton
boton.addEventListener('click', addTask);

function addTask(){
    //leer el contenido del input
    const textoTarea = lista_input.value.trim()

    //comprobar si hay contenido
    if(textoTarea == ''){
        lista_input.value = ''
        return
    }

    console.log(textoTarea);

    //añadir la tarea a la lista
    //lista_tareas.innerHTML += `<li>${textoTarea}</li>`

    const li = document.createElement('li')
    li.innerHTML = `
        ${textoTarea}
        <button class="eliminar">Eliminar</button>
    `
    //añadir el evento al botón para eliminar la tarea
    //como eliminar es una clase he de ponerle un .
    li.querySelector('.eliminar').addEventListener('click', function(){
        li.remove()
    })

    lista_tareas.appendChild(li)

    //limpiar el input
    lista_input.value = ''
}