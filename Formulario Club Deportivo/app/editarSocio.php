<?php
require_once 'conexion.php';

// ========================
// 1. Comprobar si llega un ID
// ========================
if (!isset($_GET['id'])) {
    header("Location: socios.php");
    exit;
}

$id = $_GET['id'];

// ========================
// 2. Cargar los datos del socio
// ========================
$sql = "SELECT * FROM usuarios WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $id]);
$socio = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$socio) {
    header("Location: socios.php");
    exit;
}

// ========================
// 3. Procesar formulario POST
// ========================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $telefono = $_POST['telefono'];
    $foto = $_POST['foto_actual'];

    if (!empty($_FILES['foto']['name'])) {
    $nombreArchivo = time() . '_' . $_FILES['foto']['name'];
    $rutaFinal = "uploads/usuarios/" . $nombreArchivo;

    if (move_uploaded_file($_FILES['foto']['tmp_name'], $rutaFinal)) {
        $foto = $rutaFinal; // ESTA RUTA SE GUARDA
    }
}

    $sqlUpdate = "UPDATE usuarios SET 
                    nombre = :nombre,
                    edad = :edad,
                    telefono = :telefono,
                    foto = :foto
                  WHERE id = :id";

    $stmtUpdate = $pdo->prepare($sqlUpdate);
    $stmtUpdate->execute([
        'nombre' => $nombre,
        'edad' => $edad,
        'telefono' => $telefono,
        'foto' => $foto,
        'id' => $id
    ]);

    header("Location: socios.php?edit_ok=1");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Editar socio</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body class="socios-body">

<h1 class="titulo-club">Editar socio</h1>

<div id="nav"></div>

<main class="editar-formulario">

<form method="post" enctype="multipart/form-data">

    <input type="hidden" name="foto_actual" value="<?= htmlspecialchars($socio['foto']) ?>">

    Nombre:<br>
    <input type="text" name="nombre" value="<?= htmlspecialchars($socio['nombre']) ?>"><br><br>

    Edad:<br>
    <input type="number" name="edad" value="<?= htmlspecialchars($socio['edad']) ?>"><br><br>

    Teléfono:<br>
    <input type="text" name="telefono" value="<?= htmlspecialchars($socio['telefono']) ?>"><br><br>

    Foto actual:<br>
    <?php if ($socio['foto']): ?>
        <img src="<?= htmlspecialchars($socio['foto']) ?>" width="80"><br><br>
    <?php endif; ?>

    Nueva foto:<br>
    <input type="file" name="foto"><br><br>

    <button type="submit">Guardar cambios</button>
    <a href="socios.php" class="btn-atras">Cancelar</a>

</form>

</main>

<div id="footer"></div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>
</body>
</html>
