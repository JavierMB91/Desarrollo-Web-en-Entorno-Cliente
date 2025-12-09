<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'] ?? '';
    $edad = $_POST['edad'] ?? '';
    $password = $_POST['password'] ?? '';
    $telefono = $_POST['telefono'] ?? '';

    // Validación básica
    if (!$nombre || !$edad || !$password) {
        echo '<p class="error">Todos los campos obligatorios deben completarse.</p>';
        exit;
    }

    // Hashear la contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $rol = 'socio';

    // Subida de foto
    $fotoNombre = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {

        $ext = strtolower(pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION));

        // Extensiones permitidas
        $extensionesPermitidas = ['jpg', 'jpeg'];
        if (!in_array($ext, $extensionesPermitidas)) {
            echo '<p class="error">Formato de imagen no permitido.</p>';
            exit;
        }

        // Eliminar espacios o caracteres no numéricos del teléfono
        $telefonoLimpio = preg_replace('/\D/', '', $telefono);

        // Nombre del archivo = número de teléfono
        $fotoNombre = $telefonoLimpio . '.' . $ext;

        // Carpeta destino
        $destino = __DIR__ . '/uploads/usuarios/' . $fotoNombre;

        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $destino)) {
            echo '<p class="error">Error al subir la imagen.</p>';
            exit;
        }
    }

    // Insertar en la base de datos
    try {
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, edad, password, rol, telefono, foto, fecha_registro) 
                       VALUES (:nombre, :edad, :password, :rol, :telefono, :foto, NOW())");
        $stmt->execute([
            ':nombre' => $nombre,
            ':edad' => $edad,
            ':password' => $passwordHash,
            ':rol' => $rol,
            ':telefono' => $telefono,
            ':foto' => $fotoNombre
        ]);

        echo '<p>✅ Usuario registrado correctamente.</p>';

    } catch (PDOException $e) {
        echo '<p class="error">Error al registrar el usuario: ' . $e->getMessage() . '</p>';
    }
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">

    <title>Registro de Miembro</title>
</head>
<body class="socio-body">
    <div class="container">
    <header>
        <h1 class="titulo-club">Registro de Miembro</h1>
        <div id="nav"></div>
    </header>

    <main>
    <form action="" method="post" enctype="multipart/form-data" id="formularioSocio">
        <div class="bloque-form">
            <label for="nombre">Nombre completo</label>
            <input type="text" name="nombre" id="nombre">
            <span id="nombreError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="usuario">Usuario</label>
            <input type="text" name="usuario" id="usuario">
            <span id="usuarioError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="edad">Edad</label>
            <input type="number" name="edad" id="edad">
            <span id="edadError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="password">Contraseña</label>
            <input type="password" name="password" id="password">
            <span id="passwordError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="telefono">Teléfono</label>
            <input type="tel" name="telefono" id="telefono" maxlength="12" placeholder="653 48 78 96">
            <span id="telefonoError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="foto">Foto del miembro</label>
            <input type="file" name="foto" id="foto">
            <span id="fotoError" class="error"></span>
        </div>

        <!-- Contenedor para los botones -->
        <div class="contenedor-botones">
            <button type="submit"><span>Registrarse</span></button>
            <a href="index.php" class="btn-atras"><span>Atrás</span></a>
        </div>
    </form>
    </main>

    <div id="footer"></div>

    <script src="js/funcionesSocio.js"></script>
    <script src="js/nav.js"></script>
    <script src="js/footer.js"></script>
    <script src="js/transiciones.js"></script>
    </div>
</body>
</html>
