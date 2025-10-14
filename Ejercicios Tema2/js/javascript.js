//Ejercicio 1
// console.log("Conversor de dias a horas ")

// let dia = prompt("Cuantos dias quiere calcular?")
// dia = parseInt(dia)

// let segundos = dia * 24 * 60 *60
// let minutos = dia *24 *60
// let horas = dia *24

// console.log("Sus dias equivalen a " +segundos +" segundos " +minutos+" minutos y "+horas+" horas")

// //Ejercicio 2
// console.log("Conversor de centimetros")

// let centimetros = prompt("Cuantos centimetros quiere calcular?")
// centimetros = parseInt(centimetros)

// let shaku = centimetros/30.3
// let kens = shaku / 6

// console.log("Sus centimetros equivales a "+shaku.toFixed(2)+" Shakus y "+kens.toFixed(2)+" Kens")

//Ejercicio 3

// let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// let intento;
// let intentos = 0;

// while (true) {
//   intento = parseInt(prompt("Adivina el número (entre 1 y 100):"));
//   intentos++;

//   if (isNaN(intento)) {
//     alert("Por favor, introduce un número válido.");
//     continue;
//   }

//   if (intento < numeroSecreto) {
//     alert("Demasiado bajo ");
//   } else if (intento > numeroSecreto) {
//     alert("Demasiado alto ");
//   } else {
//     alert(`¡Correcto!  El número era ${numeroSecreto}. Lo has adivinado en ${intentos} intentos.`);
//     break;
//   }
// }

//Ejercicio 4

// let palabraPalindroma = prompt("Escriba su frase")
// let resultado ="Es palidroma"
// for(i=0; i<palabraPalindroma.length/2; i++){
//     if((palabraPalindroma[i] !== palabraPalindroma[palabraPalindroma.length - 1 - i])){
//         resultado = "No es palidroma"
//     }
// }
// console.log (resultado)

// //Ejercicio 5

// let texto = prompt("Escribe una palabra o frase:");

// let ordenado = texto
//   .split('')   // Divide el string en un array de caracteres
//   .sort()      // Ordena los caracteres alfabéticamente
//   .join('');   // Vuelve a unirlos en un string

// console.log("Texto ordenado alfabéticamente:", ordenado);

// //Ejercicio 6

// let texto2 = prompt("Escribe una palabra o frase:");

// let ordenado2 = texto2
// .split('')
// .reverse()
// .join('')

// console.log("Texto ordenado inversamente: " +ordenado2);

// //Ejercicio 7

// let numero = prompt("Introduce un número entero:");

// // Ordenamos los dígitos de menor a mayor
// let ordenado = parseInt(
//   numero
//     .toString()  // Convierte el número en texto
//     .split('')   // Lo divide en caracteres
//     .sort()      // Ordena los caracteres (dígitos)
//     .join('')    // Los vuelve a unir
// );

// console.log("Número con los dígitos ordenados:", ordenado);

//Ejercicio 8

//Versión 1:
// function sumaDigitos(numero3) {
//   let suma = 0;
//   let num = Math.abs(numero3); // Por si el número es negativo

//   while (num > 0) {
//     suma += num % 10;     // Saca el último dígito y lo suma
//     num = Math.floor(num / 10); // Quita el último dígito
//   }

//   return suma;
// }

// let numero3 = parseInt(prompt("Introduce un número entero:"));
// console.log("La suma de sus dígitos es:", sumaDigitos(numero3));

//Versión 2:
function sumaDigitos(numero) {
  return numero
    .toString()        // "538"
    .split('')         // ["5", "3", "8"]
    .map(Number)       // [5, 3, 8]
    .reduce((a, b) => a + b); // 16
}

let numero = parseInt(prompt("Introduce un número entero:"));
console.log("La suma de sus dígitos es:", sumaDigitos(numero));











