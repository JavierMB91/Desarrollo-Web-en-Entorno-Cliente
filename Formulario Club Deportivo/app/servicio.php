<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Actividad</title>
</head>
<body class="servicio-body">
  <div class="container">
  <header>
    <h1 class="titulo-club">Nueva Actividad</h1>
    <div id="nav"></div>
  </header>
  <main>
  <form action="" method="post" enctype="multipart/form-data" id="formulario-servicio">
    <div class="bloque-form">
      <label for="nombre">Nombre de la actividad</label>
      <input type="text" id="nombre" name="nombre" placeholder="Club de lectura, reunión temática…">
      <span id="nombreError" class="error"></span>
    </div>

    <div class="bloque-form">
      <label for="duracion">Duración (minutos)</label>
      <input type="text" id="duracion" name="duracion">
      <span id="duracionError" class="error"></span>
    </div>

    <div class="bloque-form">
      <label for="precio">Costo</label>
      <input type="number" id="precio" name="precio">
      <span id="precioError" class="error"></span>
    </div>

    <!-- Contenedor para los botones -->
    <div class="contenedor-botones">
        <button type="submit"><span>Crear Actividad</span></button>
        <a href="servicios.php" class="btn-atras"><span>Atrás</span></a>
    </div>
  </form>
  </main>
  <div id="footer"></div>

  <script src="js/funcionesServicio.js"></script>
  <script src="js/nav.js"></script>
  <script src="js/footer.js"></script>
  </div>
</body>
</html>