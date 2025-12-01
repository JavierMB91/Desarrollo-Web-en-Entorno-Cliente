<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $duracion = $_POST['duracion'];
    $precio = $_POST['precio'];

    $sql = "INSERT INTO servicio (nombre, descripcion, duracion, precio, fecha_registro)
            VALUES (:nombre, :descripcion, :duracion, :precio, NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'nombre' => $nombre,
        'descripcion' => $descripcion,
        'duracion' => $duracion,
        'precio' => $precio
    ]);

    header("Location: servicio.php");
    exit;
}
?>