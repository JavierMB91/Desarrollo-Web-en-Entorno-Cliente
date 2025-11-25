<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/estilos.css">
  <title>Agendar Lectura</title>
</head>
<body class="cita-body">
  <header>
    <h1 class="titulo-club">Agendar Lectura Guiada</h1>
    <div id="nav"></div>
  </header>

  <script>
    fetch('nav.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('nav').innerHTML = data;
      })
      .catch(err => console.error('Error cargando nav:', err));
  </script>

  <form action="" method="post" enctype="multipart/form-data" id="formularioCita">
    <div class="bloque-form">
      <label for="cliente">Participante</label>
      <select id="cliente" name="cliente">
        <option value="">Seleccionar participante</option>
      </select>
      <span id="clienteError" class="error"></span>
    </div>

    <div class="bloque-form">
      <label for="servicio">Libro / Actividad</label>
      <select id="servicio" name="servicio">
        <option value="">Seleccionar libro o actividad</option>
      </select>
      <span id="servicioError" class="error"></span>
    </div>

    <div class="bloque-form">
      <label for="dia">Día</label>
      <input type="date" id="dia" name="dia">
      <span id="diaError" class="error"></span>
    </div>

    <div class="bloque-form">
      <label for="hora">Hora</label>
      <input type="time" id="hora" name="hora">
      <span id="horaError" class="error"></span>
    </div>

    <!-- Contenedor para los botones -->
    <div class="contenedor-botones">
        <button type="submit"><span>Agendar</span></button>
        <a href="index.php" class="btn-atras"><span>Atrás</span></a>
    </div>
  </form>
  <div id="footer"></div>

  <script src="js/funcionesCita.js"></script>
  <script src="js/nav.js"></script>
  <script src="js/footer.js"></script>
</body>
</html>