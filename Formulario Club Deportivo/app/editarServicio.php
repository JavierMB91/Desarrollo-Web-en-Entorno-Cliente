<?php
require_once 'conexion.php';

// ========================
// 1. Comprobar si llega un ID
// ========================
if (!isset($_GET['id'])) {
    header("Location: servicios.php");
    exit;
}

$id = $_GET['id'];

// ========================
// 2. Cargar los datos del servicio
// ========================
$sql = "SELECT * FROM servicio WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $id]);
$servicio = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$servicio) {
    header("Location: servicios.php");
    exit;
}

// ========================
// 3. Procesar formulario POST
// ========================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $duracion = $_POST['duracion'];
    $precio = $_POST['precio'];

    $sqlUpdate = "UPDATE servicio SET 
                    nombre = :nombre,
                    descripcion = :descripcion,
                    duracion = :duracion,
                    precio = :precio
                  WHERE id = :id";

    $stmtUpdate = $pdo->prepare($sqlUpdate);
    $stmtUpdate->execute([
        'nombre' => $nombre,
        'descripcion' => $descripcion,
        'duracion' => $duracion,
        'precio' => $precio,
        'id' => $id
    ]);

    header("Location: servicios.php?edit_ok=1");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Editar servicio</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body class="servicios-body">

<h1 class="titulo-club">Editar servicio</h1>

<div id="nav"></div>

<div class="container">

<main>


<form method="post" enctype="multipart/form-data">

    <!-- <input type="hidden" name="foto_actual" value="<?= htmlspecialchars($servicio['foto']) ?>"> -->

    Nombre:<br>
    <input type="text" name="nombre" value="<?= htmlspecialchars($servicio['nombre']) ?>"><br><br>

    Descripción:<br>
    <input type="text" name="descripcion" value="<?= htmlspecialchars($servicio['descripcion']) ?>"><br><br>

    Duración:<br>
    <input type="text" name="duracion" value="<?= htmlspecialchars($servicio['duracion']) ?>"><br><br>

    Precio:<br>
    <input type="number" name="precio" value="<?= htmlspecialchars($servicio['precio']) ?>"><br><br>

    <button type="submit">Guardar cambios</button>
    <a href="servicios.php" class="btn-atras">Cancelar</a>

</form>

</main>
</div>
<div id="footer"></div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>
</body>
</html>
