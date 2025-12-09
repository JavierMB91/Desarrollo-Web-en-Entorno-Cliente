<?php
session_start();
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $autor_id = $_POST['autor_id'] ?? '';
    $contenido = trim($_POST['contenido'] ?? '');

    if (!$autor_id || !$contenido) {
        $_SESSION['mensaje_error'] = "Debes completar todos los campos.";
        header("Location: testimonio.php");
        exit;
    }

    try {
        // Insertar comentario con fecha actual
        $sql = "INSERT INTO testimonios (autor_id, contenido, fecha)
                VALUES (:autor_id, :contenido, NOW())";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'autor_id' => $autor_id,
            'contenido' => $contenido,
        ]);

        // Mensaje de éxito
        $_SESSION['mensaje_exito'] = "✅ Comentario agregado correctamente.";

        // Redirigir a comentario.php para mostrar todos los comentarios
        header("Location: comentario.php");
        exit;

    } catch (PDOException $e) {
        $_SESSION['mensaje_error'] = "❌ Error al registrar el comentario.";
        header("Location: testimonio.php");
        exit;
    }
}
?>
