console.log("Mapa de Asientos del Autocar");

let asientos = document.getElementById("asientos");

// Definimos las dimensiones de nuestro autocar
const numeroDeFilas = 10;
const asientosPorFila = 4;

let numeroAsiento = 1; // 👈 contador global del 1 al 40

// BUCLE EXTERIOR: Recorre las filas
for (let fila = 1; fila <= numeroDeFilas; fila++) {
    asientos.innerHTML += `<br>`;
    
    // BUCLE INTERIOR: Recorre los asientos de cada fila
    for (let asiento = 1; asiento <= asientosPorFila; asiento++) {
        
        // Creamos un ID y guardamos el número de asiento
        const idAsiento = `asiento-${numeroAsiento}`;

        // Cada asiento dentro de un div para poder mostrar el número debajo
        asientos.innerHTML += `
            <div style="display:inline-block; text-align:center; margin:4px;">
                <img 
                    id="${idAsiento}"
                    data-numero="${numeroAsiento}"
                    data-estado="libre"
                    src="asientoAzul.svg"
                    alt="Asiento ${numeroAsiento}"
                    style="width:50px; height:50px; cursor:pointer;">
                <br>
                <small>${numeroAsiento}</small>
            </div>
        `;

        // Espacio del pasillo después del 2º asiento
        if (asiento === 2) {
            asientos.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        }

        numeroAsiento++; // 👈 incrementamos el contador global
    }
}

// 🔄 Interactividad
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
