<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $autor_id = $_POST['autor_id'];
    $contenido = $_POST['contenido'];

    // Insertar comentario con fecha actual
    $sql = "INSERT INTO testimonios (autor_id, contenido, fecha)
            VALUES (:autor_id, :contenido, NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'autor_id' => $autor_id,
        'contenido' => $contenido,
    ]);

    // Redirigir de nuevo a testimonio.php
    header("Location: testimonio.php");
    exit;
}
?>
