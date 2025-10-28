// Archivo: app.js
import { catalogoPiezas } from "./datos.js";
import { mostrarPiezas, precioPromedio, puntuacionMedia, totalPiezas, obtenerTop5PorPuntuacion, verificacionCategoria, precioPiezas, tarjetasGraficas, mejorCalidad, busquedaPorId, busquedaporNombre, obtenerPropiedades, conversorEntradas, obtenerTop5Baratos } from "./funciones.js";

// Corregido: usar la variable correcta 'contenedor' en lugar de 'catalogo'
let catalogo = document.getElementById('catalogo');
let media = document.getElementById('media');
let puntuacion = document.getElementById('puntuacion');
let cantidad = document.getElementById('total');
let top = document.getElementById('top5');
let verificacion = document.getElementById('categoria');
let verificacion2 = document.getElementById('categoria2');
let precio = document.getElementById('precio');
let precio2 = document.getElementById('precio2');
let tarjetas = document.getElementById('tarjetas');
let calidad = document.getElementById('mejorCalidad');
let busqueda = document.getElementById('busquedaId');
let busquedanombre = document.getElementById('busquedaNombre');
let propiedades = document.getElementById('propiedades');
let conversor = document.getElementById('conversor');
let topBaratos = document.getElementById('topBaratos');

catalogo.innerHTML = mostrarPiezas(catalogoPiezas);
media.innerHTML = precioPromedio(catalogoPiezas);
puntuacion.innerHTML = puntuacionMedia(catalogoPiezas);
cantidad.innerHTML = totalPiezas(catalogoPiezas);
top.innerHTML = obtenerTop5PorPuntuacion(catalogoPiezas);
verificacion.innerHTML = verificacionCategoria(catalogoPiezas, "Tarjeta Gráfica");
verificacion2.innerHTML = verificacionCategoria(catalogoPiezas, "HDD");
precio.innerHTML = precioPiezas(catalogoPiezas, 500);
precio2.innerHTML = precioPiezas(catalogoPiezas, 100);
tarjetas.innerHTML = tarjetasGraficas(catalogoPiezas, "Tarjeta Gráfica");
calidad.innerHTML = mejorCalidad(catalogoPiezas, 9.0);
busqueda.innerHTML = busquedaPorId(catalogoPiezas, "ram-001");
busquedanombre.innerHTML = busquedaporNombre(catalogoPiezas, "Samsung 870 EVO 2TB SATA");
propiedades.innerHTML = obtenerPropiedades(catalogoPiezas[1]);
conversor.innerHTML = conversorEntradas(catalogoPiezas[1]);
topBaratos.innerHTML = obtenerTop5Baratos(catalogoPiezas);