// //Forma 1

// const buscarPorTitulo = (busqueda) => {
//     return tienda.filter((disco) => disco.titulo.includes(busqueda))
// }

// //Forma 2
// let filtrados = []
// busqueda = 'the'
// tienda.forEach(disco => {
//     if(disco.titulo.includes(busqueda)) {
//         filtrados.push(disco)
//     }
// });



// console.log(buscarPorTitulo('the'))

// //1.2

// let pais = prompt("Diga el pais")
// const buscarPorPais = (pais) => {
//     let filtrados = tienda.filter((disco) => disco.pais.includes(pais))
//     return filtrados.sort((album1, album2) => album1.copias - album2.copias)
// }

// console.log(filtrados)
// console.log(buscarPorPais(pais))

//1.3

const albumMasReciente = () => {
    let filtrados = tienda.sort((album1, album2) => album2.publicacion - album1.publicacion)
    return filtrados[0]
}

console.log(albumMasReciente())

const albumMenosCopias = () => {
    let filtrados = tienda.sort((album1, album2) => album1.copias - album2.copias)
    return filtrados[0]
}

console.log(albumMenosCopias())