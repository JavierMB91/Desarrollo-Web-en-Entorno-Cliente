<?php
require_once 'conexion.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="shortcut icon" href="favicon/favicon.ico">
    <title>Nueva Actividad</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>

<body>

<header>
    <h1 class="titulo-club">Nueva Actividad</h1>
    <div id="nav"></div>
</header>

<div class="container">

<?php
// =====================
// PROCESAR FORMULARIO
// =====================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Recibir datos
    $nombre   = $_POST['nombre']   ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $duracion = $_POST['duracion'] ?? '';
    $precio   = $_POST['precio']   ?? '';
    $hora     = $_POST['hora']     ?? ''; // 🔥 NUEVO

    try {
        // INSERT de actividad
        $sql = "INSERT INTO servicio (nombre, descripcion, duracion, precio, hora)
                VALUES (:nombre, :descripcion, :duracion, :precio, :hora)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':nombre'      => $nombre,
            ':descripcion' => $descripcion,
            ':duracion'    => $duracion,
            ':precio'      => $precio,
            ':hora'        => $hora   // 🔥 NUEVO
        ]);

        echo '<p class="success">✅ Actividad agregada correctamente</p>';

    } catch (PDOException $e) {
        echo '<p class="error">❌ Error al insertar: ' . $e->getMessage() . '</p>';
    }
}
?>

<h1 class="titulo-club">Agregar nueva actividad</h1>

<main>
<form action="" method="post" enctype="multipart/form-data" id="formulario-servicio">

<div class="bloque-form">
    <label for="nombre">Nombre de la actividad</label>
    <input type="text" id="nombre" name="nombre" placeholder="Club de lectura, reunión temática…">
    <span id="nombreError" class="error"></span>
</div>

<div class="bloque-form">
    <label for="descripcion">Descripción</label>
    <textarea maxlength="300" id="descripcion" name="descripcion"></textarea>
    <p><span id="contador">0</span>/300 caracteres</p>
    <span id="descripcionError" class="error"></span>
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

<!-- ===================== -->
<!--     CAMPO NUEVO       -->
<!-- ===================== -->
<div class="bloque-form">
    <label for="hora">Hora</label>
    <input type="time" id="hora" name="hora" placeholder="HH:MM">
    <span id="horaError" class="error"></span>
</div>
<!-- ===================== -->

<div class="contenedor-botones">
    <button type="submit"><span>Crear Actividad</span></button>
    <a href="servicios.php" class="btn-atras"><span>Volver</span></a>
</div>

</form>
</main>

<div id="footer"></div>

<script src="js/nav.js"></script>
<script src="js/funcionesServicio.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>

</body>
</html>
