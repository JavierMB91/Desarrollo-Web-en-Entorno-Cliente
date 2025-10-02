console.log("Hola Mundo")

let nombre = "Javier"

let edad = 25

let esEstudiante = true

console.log("Nombre: " + nombre)
console.log("Edad: " + edad)
console.log("¿Es estudiante? " +esEstudiante)

// const nombre2 = "Jose", para variables que no van a cambiar

// var nombre3 = "Pepe", no se usa

// Calculadora Basica

function sumar(a, b){
    return a + b
}
// Forma 1
let resultado = sumar(3, 6)
console.log(resultado)

// Forma 2
console.log(sumar(4, 18))



// CLasificar Edad
// Mi Forma

function clasificarEdad(edad){
    if (edad > 0 && edad <= 13){
        return "Niño"
    } else if (edad > 13 && edad <= 17) {
        return "Adolescente";
    } else if (edad >= 18 && edad <= 64){
        return "Adulto"
    } else if (edad >= 65){
        return "Adulto Mayor"
   }
}

console.log(clasificarEdad(66))

// Forma Profesora 1

function clasificarEdad2(edad){
    let respuesta =""
    if (edad > 0 && edad <= 13){
        respuesta = "Niño"
    } else if (edad > 13 && edad <= 17) {
        respuesta = "Adolescente";
    } else if (edad >= 18 && edad <= 64){
        respuesta = "Adulto"
    } else if (edad >= 65){
        respuesta = "Adulto Mayor"
    }else{
        respuesta ="Edad no válida"
    }
    return respuesta
}

console.log(clasificarEdad2(55))


// Forma Profesora 2

function clasificarEdad3(edad){
    if(edad < 0 || edad > 110){
        return "Edad no válida"
    }

    if(edad <= 13){
        return "Niño"
    }

    if(edad <= 17){
        return "Adolescente"
    }

    if(edad <= 64){
        return "Adulto"
    }

    return "Adulto Mayor"
}

console.log(clasificarEdad3(-1))


// Tabla de multiplicar básica del 1 al 10 para un número dado
function tablaMultiplicar(numero) {
    for(let i = 1; i <= 10; i++) {
        console.log(numero + " x " + i + " = " + (numero * i))
        // literales console.log(`${numero} X ${i} = ${numero * i}`)
    }
}
// Ejemplo de uso:
tablaMultiplicar(5) // Cambia el número por el que quieras

// Arrays - Gestion de lista de la compra
let listaCompras = ["manzanas", "pan", "leche", "huevos"]

// push() añade un objeto al array al final

listaCompras.push("vino")

console.log(listaCompras)

// shift() quita el primer objeto del array
listaCompras.shift()
console.log(listaCompras)

// Ejercicio objetos
// objetos van entre {}
let persona = {
    nombre: "Carlos",
    edad: 30,
    ciudad: "Granada",
    hobbies: ["leer", "nadar"]
}

console.log(persona.nombre)
console.log(persona["nombre"])

//mostrar por consola Carlos es de Granada y le gusta leer y nadar

console.log(persona["nombre"], persona["edad"], persona["ciudad"], persona["hobbies"])

// mostrar por consola Carlos es de Granada y le gusta leer y nadar

console.log(`${persona.nombre} tiene ${persona.edad} años y es de ${persona.ciudad}, le gusta ${persona.hobbies[0]} y ${persona.hobbies[1]}`)

// Analizador de Texto

function analizarTexto(texto){
    //convertir a mayusculas
    console.log(texto.toUpperCase())

    //convertir en minusculas
    console.log(texto.toLowerCase())

    //contar el numero de caracteres
    console.log("Numero de caracteres: " + texto.length)

    //contar numero de palabras
    //la funcion split devuelve un array con elementos del string
    //se le pasa un separador, en este caso el espacio

    let palabras = texto.split(" ")

    console.log("El texto tiene: " + palabras.length)
}

analizarTexto("Vamos a aprender javascript")

// Generador de Contraseñas
function generarPassword(longitud){
    const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789"

    console.log(caracteres[3])
    //let numero = Math.random() * caracteres.length
    //console.log("caracteres tiene: " +caracteres.length)
    //console.log(numero)

    let password = ""

    for (i = 0; i <= longitud; i++){
        //generar un numero aleatorio entre 0 y la longitud del array
        indice = Math.random() * caracteres.length
        //pasar el numero entero con parseInt()
        indice = parseInt(indice)
        //sacamos la letra de la cadena de caracteres
        letra = caracteres[indice]
        //añadirle la letra al password
        password = password + letra
    }
    console.log(password)
}

generarPassword(20)

//sacar un caracter con ASCI

console.log(String.fromCharCode(65))

//Tema 2

//Ejercicio 1

let precio = 100
let iva = 21
let preciojamon= (precio * iva)/100 + precio

console.log(`El precio del jamon con iva es: ${preciojamon}€`)

//Ejercicio 2

const jamones = 23
const empleados = 10
const reparto = parseInt(jamones/empleados)
//parseInt y math.floor sirven para transformar numeros a enteros
const jamonessobrantes = jamones % empleados

console.log("Los jamones repartidos son : " + reparto + "," + " Los jamones sobrantes son: " + jamonessobrantes)

//Ejercicio 3

let nombreempleado = "Ana"
let profesion = "Profesora"
let antiguedad = 10
let sueldo = 1200
let plus = 10
let sueldoConPlus = sueldo + (plus/100 * antiguedad)
let mensaje = ("Su nombre es: " + nombreempleado + " \nSu profesion es: " + profesion + "\nSu antigüedad es: " + antiguedad + "\nSu sueldo es: " + sueldo + "€" + "\nSu plus por antiguedad es: " + plus + "\nSu sueldo neto es: " +sueldoConPlus + "€")
console.log(mensaje)

document.getElementById("informacion").innerText = mensaje

//Ejercicio 4

// let listaEmpleados = ["Javier", "Alejandro 1", "Alejandro 2", "David", "Chema", "Ivan"]

//alert
//alert("Hola")
//promt devielde el texto introducido por el usuario
// let empleadoPrompt = prompt("Introduce el nombre del empleado")
// let saludoEmpleado = "Acceso denegado"

// for(let i = 0; i < listaEmpleados.length; i++) {
//     if(empleadoPrompt == listaEmpleados[i]){
//         saludoEmpleado = `Hola ${empleadoPrompt}`
//     }
// }

//solucion 2
// listaEmpleados.forEach(empleado => {
//     if(empleadoPrompt == empleado){
//         saludoEmpleado = `Hola ${empleado}`
//     }
// });
//solucion 3
// if(listaEmpleados.includes(empleadoPrompt)){
//     saludoEmpleado = `Hola ${empleadoPrompt}`
// }


// document.getElementById("empleadoTxt").innerText = saludoEmpleado

//Ejercicio 5
let listaProductosHtml = document.getElementById("listaProductos")
let producto = null
do {
    producto = prompt("¿Qué producto quiere comprar?")

//añadir el producto a la listaProductos
if(producto !== null){
    listaProductosHtml.innerHTML += `<li>${producto}</li>`
}

}while(producto !== null)