// c:\Users\AULA4-2DAW\Desktop\2º DAW\Desarrollo-Web-en-Entorno-Cliente\Carrito\js\main.js

// --- 1. VARIABLES GLOBALES Y SELECTORES DEL DOM ---
// Guardamos en constantes los elementos del HTML con los que vamos a interactuar.
// Esto es más eficiente que buscarlos cada vez que los necesitemos.

// El contenedor donde se mostrarán las tarjetas de los productos.
const gridProductos = document.querySelector('.grid-productos');
// El contenedor donde se mostrarán los productos añadidos al carrito.
const contenedorItemsCarrito = document.querySelector('.carrito-items');
// El elemento <span> que muestra el subtotal del carrito.
const spanSubtotal = document.getElementById('subtotal-carrito');
// El elemento <span> que muestra el total del carrito.
const spanTotal = document.getElementById('total-carrito');
// El botón para finalizar el pedido.
const btnFinalizar = document.querySelector('.btn-checkout');

// --- 2. ESTADO DEL CARRITO ---
// Este array 'carrito' es la pieza central de nuestra lógica.
// Almacenará objetos, donde cada objeto representa un producto en el carrito.
// Ejemplo de un objeto: { id: 1, cantidad: 2 }
let carrito = [];
const CLAVE_STORAGE_CARRITO = 'carrito';

// --- 3. FUNCIONES DE UTILIDAD ---
// Función auxiliar para formatear un número y mostrarlo como moneda en formato europeo (€).
const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(monto);
};

const guardarCarritoEnStorage = () => {
    localStorage.setItem(CLAVE_STORAGE_CARRITO, JSON.stringify(carrito));
};

const cargarCarritoDesdeStorage = () => {
    const carritoGuardado = localStorage.getItem(CLAVE_STORAGE_CARRITO);
    if (!carritoGuardado) return;

    try {
        const carritoParseado = JSON.parse(carritoGuardado);
        if (!Array.isArray(carritoParseado)) return;

        carrito = carritoParseado
            .filter(item => Number.isInteger(item.id) && Number.isInteger(item.cantidad) && item.cantidad > 0)
            .filter(item => productos.some(producto => producto.id === item.id));
    } catch (error) {
        carrito = [];
    }
};

// --- 4. FUNCIONES DE RENDERIZADO (DIBUJAR EN LA PANTALLA) ---

// Función encargada de crear y mostrar todos los productos del catálogo en el HTML.
const renderizarProductos = () => {
    gridProductos.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    productos.forEach(producto => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('card');
        tarjeta.innerHTML = `
            <div class="card-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span class="codigo">${producto.codigo}</span>
                </div>
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="card-description">${producto.descripcion}</p>
                <div class="card-footer">
                    <span class="precio">${formatearMoneda(producto.precio)}</span>
                    <button class="btn-add" data-id="${producto.id}">Añadir al carrito</button>
                </div>
            </div>
        `;
        gridProductos.appendChild(tarjeta);
    });

    // Añadir event listeners a los botones "Añadir al carrito"
    document.querySelectorAll('.btn-add').forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const idProducto = parseInt(evento.target.dataset.id);
            agregarAlCarrito(idProducto);
        });
    });
};

// Función encargada de actualizar y mostrar los productos que están en el array 'carrito'.
const renderizarCarrito = () => {
    contenedorItemsCarrito.innerHTML = ''; // Siempre vaciamos el carrito antes de volver a dibujarlo para no duplicar elementos.

    // Si el array 'carrito' está vacío, muestra un mensaje y deshabilita el botón de finalizar.
    if (carrito.length === 0) {
        contenedorItemsCarrito.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
        btnFinalizar.disabled = true; // Deshabilitar botón de finalizar pedido si el carrito está vacío
    } else {
        btnFinalizar.disabled = false; // Habilitar si hay ítems
        carrito.forEach(item => {
            const producto = productos.find(p => p.id === item.id);
            if (!producto) return; // Seguridad: si por alguna razón el producto no existe, no continuamos.

            const divItemCarrito = document.createElement('div');
            divItemCarrito.classList.add('carrito-item');
            // Usamos template literals para construir el HTML del item del carrito.
            divItemCarrito.innerHTML = `
                <div class="carrito-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="carrito-info">
                    <h4>${producto.nombre}</h4>
                    <div class="cantidad-control">
                        <button class="btn-qty" data-id="${item.id}" data-action="decrementar">-</button>
                        <input type="text" value="${item.cantidad}" readonly>
                        <button class="btn-qty" data-id="${item.id}" data-action="incrementar">+</button>
                    </div>
                    <p class="item-price">${formatearMoneda(item.cantidad * producto.precio)}</p>
                </div>
                <button class="btn-remove" data-id="${item.id}" title="Eliminar">&times;</button>
            `;
            contenedorItemsCarrito.appendChild(divItemCarrito);
        });

        // Añadir event listeners a los botones de cantidad y eliminar
        // Esto se hace DESPUÉS de crear los botones.
        document.querySelectorAll('.btn-qty').forEach(boton => {
            boton.addEventListener('click', (evento) => {
                const idProducto = parseInt(evento.target.dataset.id);
                const accion = evento.target.dataset.action;
                actualizarCantidad(idProducto, accion === 'incrementar' ? 1 : -1);
            });
        });

        document.querySelectorAll('.btn-remove').forEach(boton => {
            boton.addEventListener('click', (evento) => {
                const idProducto = parseInt(evento.target.dataset.id);
                eliminarDelCarrito(idProducto);
            });
        });
    }

    // Después de cualquier cambio en el carrito, recalculamos y mostramos los totales.
    actualizarTotalesCarrito();
    guardarCarritoEnStorage();
};

// Función para calcular y mostrar los totales (subtotal y total).
const actualizarTotalesCarrito = () => {
    let subtotal = 0;
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) { // Nos aseguramos de que el producto existe
            subtotal += item.cantidad * producto.precio;
        }
    });

    // En este ejemplo, el envío es gratis, así que subtotal = total
    const total = subtotal;

    // Actualizamos el texto de los totales en el HTML.
    spanSubtotal.textContent = formatearMoneda(subtotal);
    spanTotal.textContent = formatearMoneda(total);
};

// --- 5. FUNCIONES DE LÓGICA DEL CARRITO (MANIPULACIÓN DE DATOS) ---

// Función para añadir un producto al carrito.
const agregarAlCarrito = (idProducto) => {
    const itemExistente = carrito.find(item => item.id === idProducto);
    if (itemExistente) {
        // Si ya existe, incrementamos su cantidad.
        itemExistente.cantidad++;
    } else {
        // Si no existe, lo añadimos al array.
        carrito.push({ id: idProducto, cantidad: 1 });
    }
    renderizarCarrito(); // Actualizamos la vista del carrito.
};

// Función para cambiar la cantidad de un producto (incrementar o decrementar).
const actualizarCantidad = (idProducto, cambio) => {
    const indiceItem = carrito.findIndex(item => item.id === idProducto);
    if (indiceItem > -1) {
        carrito[indiceItem].cantidad += cambio;
        if (carrito[indiceItem].cantidad <= 0) {
            // Si la cantidad llega a 0 o menos, eliminar el producto del carrito
            carrito.splice(indiceItem, 1);
        }
    }
    renderizarCarrito();
};

// Función para eliminar un producto completamente del carrito.
const eliminarDelCarrito = (idProducto) => {
    // Usamos .filter() para crear un nuevo array que contenga todos los items EXCEPTO el que queremos eliminar.
    carrito = carrito.filter(item => item.id !== idProducto);
    renderizarCarrito();
};

// Función que se ejecuta al pulsar "Finalizar Pedido".
const finalizarPedido = () => {
    if (carrito.length > 0) {
        // En una aplicación real, aquí se enviaría el 'carrito' a un servidor.
        alert('¡Pedido finalizado con éxito! Gracias por tu compra.');
        carrito = [];
        renderizarCarrito();
    } else {
        alert('Tu carrito está vacío. Añade productos antes de finalizar el pedido.');
    }
};

// --- 6. INICIALIZACIÓN ---
// Este es el punto de entrada de nuestra aplicación.
// 'DOMContentLoaded' es un evento que se dispara cuando todo el HTML ha sido cargado.
// Nos aseguramos de que nuestro script no intente manipular elementos que aún no existen.
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeStorage();
    renderizarProductos(); // Dibuja la lista de productos en el catálogo.
    renderizarCarrito();     // Dibuja el estado inicial del carrito (vacío).

    // Asignamos la función 'finalizarPedido' al evento 'click' del botón.
    btnFinalizar.addEventListener('click', finalizarPedido);
});