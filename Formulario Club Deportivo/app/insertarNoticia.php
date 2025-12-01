<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $titulo = $_POST['titulo'];
    $contenido = $_POST['contenido'];

    // Procesar foto si existe
    $foto = null;
    if (!empty($_FILES['foto']['name'])) {
        $foto = time() . '_' . $_FILES['foto']['name'];
        move_uploaded_file($_FILES['foto']['tmp_name'], 'uploads/noticias/' . $foto);
    }

    $sql = "INSERT INTO noticias (titulo, contenido, imagen, fecha_publicacion)
            VALUES (:titulo, :contenido, :imagen, NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'titulo' => $titulo,
        'contenido' => $contenido,
        'imagen' => $foto,
    ]);

    header("Location: noticia.php");
    exit;
}
?>
