<?php
require_once 'conexion.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar nuevo socio</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>

<body>

<header>
    <h1 class="titulo-club">Nuevo Socio</h1>
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
    $edad     = $_POST['edad']     ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $clave    = $_POST['clave']    ?? '';

    // Tratar edad: si viene vacía → NULL (evita error SQL)
    $edad = ($edad === '') ? null : $edad;

    // Manejo de imagen
    $fotoNombre = $_FILES['foto']['name'] ?? '';
    $fotoTmp    = $_FILES['foto']['tmp_name'] ?? '';
    $rutaGuardada = 'uploads/usuarios/';

    if (!empty($fotoNombre)) {
        $rutaGuardada = "uploads/usuarios/" . time() . "_" . $fotoNombre;
        move_uploaded_file($fotoTmp, $rutaGuardada);
    }

    try {
        // INSERT de socio
        $sql = "INSERT INTO usuarios (nombre, edad, telefono, foto, clave)
                VALUES (:nombre, :edad, :telefono, :foto, :clave)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':nombre'   => $nombre,
            ':edad'     => $edad,
            ':telefono' => $telefono,
            ':foto'     => $rutaGuardada,
            ':clave'    => $clave
        ]);

        echo '<p class="success">✅ Socio agregado correctamente</p>';

    } catch (PDOException $e) {
        echo '<p class="error">❌ Error al insertar: ' . $e->getMessage() . '</p>';
    }
}
?>

<h1 class="titulo-club">Agregar nuevo socio</h1>

<main>
<form action="" method="post" enctype="multipart/form-data" id="formularioNuevoSocio">

<div class="bloque-form">
    <input type="text" name="nombre" placeholder="Nombre">
    <span id="errorNombre" class="error"></span>
</div>

<div class="bloque-form">
    <input type="number" name="edad" placeholder="Edad" min="1">
    <span id="errorEdad" class="error"></span>
</div>

<div class="bloque-form">
    <input type="text" name="telefono" placeholder="612 - 345 - 678">
    <span id="errorTelefono" class="error"></span>
</div>

<div class="bloque-form">
    <input type="text" name="clave" placeholder="Clave del socio">
    <span id="errorClave" class="error"></span>
</div>

<div class="bloque-form">
    <input type="file" name="foto" accept="image/jpg, image/jpeg, image/png">
    <span id="errorFoto" class="error"></span>
</div>


    <div class="contenedor-botones">
        <button type="submit"><span>Agregar socio</span></button>
        <a href="socios.php" class="btn-atras"><span>Atrás</span></a>
    </div>

</form>
</main>

<div id="footer"></div>

</div>

<script src="js/nav.js"></script>
<script src="js/funcionesAñadirSocio.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>

</body>
</html>
