export function mostrarPiezas(piezas) {
    let contenido = "";

    // Iteramos sobre el array 'piezas'
    piezas.forEach(pieza => {
        contenido += `
        <div class="catalogo">
            <img 
                class="card-img" 
                src="img/${pieza.id}.png" 
                alt="${pieza.nombre}"
                onerror="this.src='img/imagenFallo.png'; this.classList.add('error')"
            >
            <div class="catalogo-container">
                <h2>${pieza.nombre}</h2>
                <p>${pieza.categoria}</p>
                <div class="card-info">
                    <span class="precio">Precio: $${pieza.precio.toFixed(2)}</span>
                    <span class="puntuacion">Puntuación: ${pieza.puntuacion}/10</span>
                </div>
                
                <!-- Sección de especificaciones técnicas -->
                <div class="especificaciones">
                    <h3>Especificaciones:</h3>
                    <ul>
                        ${Object.keys(pieza)
                            .filter(key => !['id', 'nombre', 'categoria', 'precio', 'puntuacion'].includes(key))
                            .map(key => `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${pieza[key]}</li>`)
                            .join('')}
                    </ul>
                </div>
            </div>
        </div>
        `; 
    })

    return contenido;
}

export function precioPromedio(piezas) {
    const media = piezas.reduce((acumulador, pieza) => {
        return acumulador + pieza.precio;
    }, 0);
    return media/piezas.length;
}

export function puntuacionMedia(piezas) {
    const puntuacion = piezas.reduce((acumulador, notas) => {
        return acumulador + notas.puntuacion;
    }, 0);
    return puntuacion/piezas.length;
}

export function totalPiezas(piezas) {
    return piezas.length;
}

export function obtenerTop5PorPuntuacion(piezas) {
  // 1. Copiamos el array para no modificar el original con sort()
  // 2. Ordenamos la copia de mayor a menor según la propiedad 'puntuacion'
  const arrayOrdenado = [...piezas].sort((a, b) => b.puntuacion - a.puntuacion);
  
  // 3. Devolvemos solo los primeros 5 elementos
  return mostrarPiezas(arrayOrdenado.slice(0, 5));
}

export function verificacionCategoria(piezas, categoria) {
  const resultadoCategoria = piezas.filter(pieza => pieza.categoria === categoria);
  
  if (resultadoCategoria.length > 0) {
    return `Sí, se encontraron ${resultadoCategoria.length} piezas de la categoría '${categoria}'.`;
  } else {
    return `No, no hay piezas de la categoría '${categoria}'.`;
  }
}

export function precioPiezas(piezas, dinero) {
  const resultadoPrecio = piezas.every(pieza  => pieza.precio >= dinero);
  
  if (resultadoPrecio) {
    return `¿Todas las piezas valen mas de ${dinero}? Si.`;
  } else {
    return `¿Todas las piezas valen mas de ${dinero}? No.`;
  }
}

export function tarjetasGraficas(piezas, categoria) {
    const filtro = piezas.filter(pieza => pieza.categoria === categoria);

    let contenido = "";
    
    if(filtro.length > 0){
        filtro.forEach(pieza => {
        contenido += `
        <div class="catalogo">
            <div class="catalogo-container">
            <P>${pieza.nombre} - ${pieza.precio}€ - ⭐${pieza.puntuacion}</P>
            </div>
        </div>
        `;
         })
    }
    return contenido;
}