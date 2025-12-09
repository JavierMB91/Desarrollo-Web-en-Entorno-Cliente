<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'] ?? '';
    $edad = $_POST['edad'] ?? '';
    $telefono = $_POST['telefono'] ?? '';

    // Validación básica
    if (!$nombre || !$telefono) {
        echo '<p class="error">Nombre y teléfono son obligatorios.</p>';
        exit;
    }

    // Procesar foto si existe
    $foto = null;
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {

        $ext = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));

        // Validar extensión
        $extPermitidas = ['jpg','jpeg'];
        if (!in_array($ext, $extPermitidas)) {
            echo '<p class="error">Formato de imagen no permitido.</p>';
            exit;
        }

        // Limpiar teléfono (quitar espacios, guiones, etc.)
        $telefonoLimpio = preg_replace('/\D/', '', $telefono);

        // Nombre de archivo = telefono.ext
        $foto = $telefonoLimpio . '.' . $ext;

        $rutaDestino = __DIR__ . '/uploads/usuarios/' . $foto;

        // Subir archivo
        if (!move_uploaded_file($_FILES['foto']['tmp_name'], $rutaDestino)) {
            echo '<p class="error">Error al subir la imagen.</p>';
            exit;
        }
    }

    // Insertar socio en la base de datos
    $sql = "INSERT INTO usuarios (nombre, edad, telefono, foto, rol, password, fecha_registro)
            VALUES (:nombre, :edad, :telefono, :foto, 'socio', '12345', NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'nombre' => $nombre,
        'edad' => $edad,
        'telefono' => $telefono,
        'foto' => $foto
    ]);

    // Redirigir a la lista de socios
    header("Location: socios.php");
    exit;
}
?>

