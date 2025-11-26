<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $telefono = $_POST['telefono'];

    // Procesar foto si existe
    $foto = null;
    if (!empty($_FILES['foto']['name'])) {
        $foto = time() . '_' . $_FILES['foto']['name'];
        move_uploaded_file($_FILES['foto']['tmp_name'], 'uploads/fotos/' . $foto);
    }

    // Insertar socio
    $sql = "INSERT INTO usuarios (nombre, edad, telefono, foto, rol, clave, fecha_registro)
            VALUES (:nombre, :edad, :telefono, :foto, 'socio', '12345', NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'nombre' => $nombre,
        'edad' => $edad,
        'telefono' => $telefono,
        'foto' => $foto
    ]);

    header("Location: socios.php");
    exit;
}
?>
