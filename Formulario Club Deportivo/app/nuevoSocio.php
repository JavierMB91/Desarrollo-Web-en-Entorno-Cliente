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
    $password    = $_POST['password']    ?? '';

    // Tratar edad: si viene vacía → NULL
    $edad = ($edad === '') ? null : $edad;

    // Manejo de imagen
    $fotoNombre = null;

    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {

        $ext = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));
        $fotoTmp = $_FILES['foto']['tmp_name'];

        // Extensiones válidas
        $extValidas = ['jpg', 'jpeg'];
        if (!in_array($ext, $extValidas)) {
            echo '<p class="error">Formato de imagen no permitido.</p>';
            exit;
        }

        // Limpiar teléfono
        $telefonoLimpio = preg_replace('/\D/', '', $telefono);

        // Nombre de archivo = teléfono
        $fotoNombre = $telefonoLimpio . "." . $ext;

        // Ruta destino
        $rutaDestino = __DIR__ . "/uploads/usuarios/" . $fotoNombre;

        // Subir imagen
        if (!move_uploaded_file($fotoTmp, $rutaDestino)) {
            echo '<p class="error">❌ Error al subir la imagen.</p>';
            exit;
        }
    }

    try {
        // INSERT de socio
        $sql = "INSERT INTO usuarios (nombre, edad, telefono, foto, password)
                VALUES (:nombre, :edad, :telefono, :foto, :password)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':nombre'   => $nombre,
            ':edad'     => $edad,
            ':telefono' => $telefono,
            ':foto'     => $fotoNombre,
            ':password'    => $password
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
    <label for="nombre">Nombre Completo</label>
    <input id="nombre" type="text" name="nombre" placeholder="Nombre Completo">
    <span id="errorNombre" class="error"></span>
</div>

<div class="bloque-form">
    <label for="edad">Edad</label>
    <input id="number" type="number" name="edad" placeholder="Edad" min="1">
    <span id="errorEdad" class="error"></span>
</div>

<div class="bloque-form">
    <label for="telefono">Telefono</label>
    <input id="telefono" type="tel" name="telefono" placeholder="653 48 78 96">
    <span id="errorTelefono" class="error"></span>
</div>

<div class="bloque-form">
    <label for="password">Contraseña</label>
    <input id="password" type="password" name="password" placeholder="Contraseña">
    <span id="passwordError" class="error"></span>
</div>

<div class="bloque-form">
    <label for="hora">Foto</label>
    <input id="foto" type="file" name="foto" accept="image/jpg, image/jpeg, image/png">
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
