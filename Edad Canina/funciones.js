const edadTxt = document.getElementById("edadTxt")
const btnCalcular = document.getElementById("btnCalcular")
const mensaje = document.getElementById("mensaje")

btnCalcular.addEventListener('click', () => {
    const edad = edadTxt.value
    if (edad < 0 || edad > 30) {
        mensaje.innerText = `La edad de su perro no es valida`
        return
    }
    let edadHumana = edad * 7
    mensaje.innerText = `Su perro tiene ${edadHumana} años en edad humana`
})


//funciones en javascript

// function suma(num1, num2) {
//     return num1 + num2
// }

// const suma2 = (num1, num2) => {
//     return num1 + num2
// }