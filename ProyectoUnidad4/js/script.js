console.log("Mapa de Asientos del Autocar");

let asientos = document.getElementById("asientos");

// Definimos las dimensiones de nuestro autocar
const numeroDeFilas = 10;
const asientosPorFila = 4;

// BUCLE ÚNICO: Recorre todas las filas para mantener la estructura
for (let fila = 1; fila <= numeroDeFilas; fila++) {
    asientos.innerHTML += `<br>`; // Salto de línea para cada nueva fila
            
    // BUCLE INTERIOR: Recorre las 4 posiciones de asientos en cada fila
    for (let asiento = 1; asiento <= asientosPorFila; asiento++) {
        let numeroAsientoActual;
        let generarAsiento = true; // Una bandera para saber si debemos crear un asiento o un hueco

        // --- LÓGICA DE NUMERACIÓN Y HUECO ---

        // Caso 1: Filas 1 a 4 (asientos 1 al 16)
        if (fila < 5) {
            numeroAsientoActual = (fila - 1) * asientosPorFila + asiento;
        } 
        // Caso 2: Fila 5 (la especial, con asientos 17, 18 y un hueco)
        else if (fila === 5) {
            if (asiento <= 2) {
                // Generamos los asientos 17 y 18
                numeroAsientoActual = (fila - 1) * asientosPorFila + asiento;
            } else {
                // Para las posiciones 3 y 4, creamos un hueco en lugar de un asiento
                generarAsiento = false;
                // Este div vacío mantiene el espaciado y la alineación
                asientos.innerHTML += `<div style="display:inline-block; text-align:center; margin:4px; width:58px; height:70px;"></div>`;
            }
        }
        // Caso 3: Filas 6 a 10 (asientos 19 al 38)
        else {
            // Ajustamos el número para que continúe desde el 18
            // 18 + ((fila-6)*4 + asiento) nos da la secuencia 19, 20, 21...
            numeroAsientoActual = 18 + ((fila - 6) * asientosPorFila + asiento);
        }

        // --- GENERACIÓN DEL HTML DEL ASIENTO ---
        if (generarAsiento) {
            const idAsiento = `asiento-${numeroAsientoActual}`;

            asientos.innerHTML += `
                <div style="display:inline-block; text-align:center; margin:4px;">
                    <img 
                        id="${idAsiento}"
                        data-numero="${numeroAsientoActual}"
                        data-estado="libre"
                        src="asientoAzul.svg" 
                        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwN2JmZiI+PHBhdGggZD0iTTQgNnYxNmMwIDEuMS45IDIgMiAyaDhjMS4xIDAgMi0uOSAyLTJWNmMwLTEuMS0uOS0yLTItMkg2Yy0xLjEgMC0yIC45LTIgMm0xIDBIMTJ2MTZINVY2em0xMSAwdjE2YzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yaC04Yy0xLjEgMC0yIC45LTIgMm0xIDBoMTZ2MTZoLThWNloiLz48L3N2Zz4='"
                        alt="Asiento ${numeroAsientoActual}"
                        style="width:50px; height:50px; cursor:pointer;">
                    <br>
                    <small>${numeroAsientoActual}</small>
                </div>
            `;
        }

        // Espacio del pasillo después del 2º asiento de cada fila
        if (asiento === 2) {
            asientos.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        }
    }
}

// 🔄 Interactividad (sin cambios, funciona para todos los asientos generados)
let todosLosAsientos = document.querySelectorAll("#asientos img");

todosLosAsientos.forEach(img => {
    img.addEventListener("click", () => {
        let estado = img.dataset.estado;

        if (estado === "libre") {
            img.src = "asientoAmarillo.svg";
            img.dataset.estado = "reservado";
        } else if (estado === "reservado") {
            img.src = "asientoRojo.svg";
            img.dataset.estado = "ocupado";
        } else {
            img.src = "asientoAzul.svg";
            img.dataset.estado = "libre";
        }

        console.log(`Asiento ${img.dataset.numero} → ${img.dataset.estado}`);
    });
});