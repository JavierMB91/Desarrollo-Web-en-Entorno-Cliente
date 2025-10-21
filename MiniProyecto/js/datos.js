export const catalogoPiezas = [
  // --- Categoría: Procesador ---
  {
    id: "cpu-001",
    nombre: "AMD Ryzen 5 5600X",
    categoria: "Procesador",
    precio: 189.99,
    puntuacion: 8.8,
    compatibilidad: "Socket AM4",
    nucleos: 6,
    hilos: 12
  },
  {
    id: "cpu-002",
    nombre: "Intel Core i5-12400F",
    categoria: "Procesador",
    precio: 169.99,
    puntuacion: 8.7,
    compatibilidad: "Socket LGA1700",
    nucleos: 6,
    hilos: 12
  },
  {
    id: "cpu-003",
    nombre: "AMD Ryzen 9 7950X",
    categoria: "Procesador",
    precio: 549.99,
    puntuacion: 9.5,
    compatibilidad: "Socket AM5",
    nucleos: 16,
    hilos: 32
  },

  // --- Categoría: Tarjeta Gráfica ---
  {
    id: "gpu-001",
    nombre: "NVIDIA GeForce RTX 4060",
    categoria: "Tarjeta Gráfica",
    precio: 299.99,
    puntuacion: 8.2,
    memoriaVRAM: "8 GB GDDR6",
    consumo: 115,
    refrigeracion: "Dual Fan"
  },
  {
    id: "gpu-002",
    nombre: "AMD Radeon RX 7700 XT",
    categoria: "Tarjeta Gráfica",
    precio: 449.99,
    puntuacion: 8.6,
    memoriaVRAM: "12 GB GDDR6",
    consumo: 245,
    refrigeracion: "Triple Fan"
  },
  {
    id: "gpu-003",
    nombre: "NVIDIA GeForce RTX 4080 Super",
    categoria: "Tarjeta Gráfica",
    precio: 999.99,
    puntuacion: 9.3,
    memoriaVRAM: "16 GB GDDR6X",
    consumo: 320,
    refrigeracion: "Triple Fan"
  },

  // --- Categoría: Memoria RAM ---
  {
    id: "ram-001",
    nombre: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
    categoria: "Memoria RAM",
    precio: 49.99,
    puntuacion: 7.5,
    tipo: "DDR4",
    capacidad: "16GB",
    latencia: "CL16"
  },
  {
    id: "ram-002",
    nombre: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6000MHz",
    categoria: "Memoria RAM",
    precio: 159.99,
    puntuacion: 9.0,
    tipo: "DDR5",
    capacidad: "32GB",
    latencia: "CL30"
  },

  // --- Categoría: Disco SSD ---
  {
    id: "ssd-001",
    nombre: "Samsung 870 EVO 2TB SATA",
    categoria: "Disco SSD",
    precio: 149.99,
    puntuacion: 8.5,
    tipo: "SATA III",
    capacidad: "2TB",
    lectura: "560 MB/s"
  },
  {
    id: "ssd-002",
    nombre: "WD Black SN850X 1TB NVMe M.2",
    categoria: "Disco SSD",
    precio: 119.99,
    puntuacion: 9.1,
    tipo: "PCIe Gen4 NVMe",
    capacidad: "1TB",
    lectura: "7300 MB/s"
  }
];

// Ejemplo de cómo podrías usar el array:
// console.log("Catálogo completo:", catalogoPiezas);

// Filtrar por categoría:
// const procesadores = catalogoPiezas.filter(pieza => pieza.categoria === "Procesador");
// console.log("Procesadores disponibles:", procesadores);

// Encontrar una pieza por su ID:
// const piezaEspecifica = catalogoPiezas.find(pieza => pieza.id === "gpu-002");
// console.log("Detalle de la pieza gpu-002:", piezaEspecifica);