<?php
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $titulo = $_POST['titulo'] ?? '';
    $contenido = $_POST['contenido'] ?? '';

    if (!$titulo || !$contenido) {
        echo '<p class="error">Título y contenido son obligatorios.</p>';
        exit;
    }

    // 1️⃣ Insertar noticia sin imagen
    $sql = "INSERT INTO noticias (titulo, contenido, fecha_publicacion)
            VALUES (:titulo, :contenido, NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'titulo' => $titulo,
        'contenido' => $contenido
    ]);

    // 2️⃣ Obtener el ID generado
    $idNoticia = $pdo->lastInsertId();

    $fotoNombre = null;

    // 3️⃣ Procesar imagen si existe
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));

        // Validar extensión
        $extPermitidas = ['jpg','jpeg','png','webp'];
        if (!in_array($ext, $extPermitidas)) {
            echo '<p class="error">Formato de imagen no permitido.</p>';
            exit;
        }

        // Nombre de archivo = id.ext
        $fotoNombre = $idNoticia . '.' . $ext;
        $rutaDestino = __DIR__ . '/uploads/noticias/' . $fotoNombre;

        if (!move_uploaded_file($_FILES['foto']['tmp_name'], $rutaDestino)) {
            echo '<p class="error">Error al subir la imagen.</p>';
            exit;
        }

        // 4️⃣ Actualizar noticia con la imagen
        $sqlUpdate = "UPDATE noticias SET imagen = :imagen WHERE id = :id";
        $stmtUpdate = $pdo->prepare($sqlUpdate);
        $stmtUpdate->execute([
            'imagen' => $fotoNombre,
            'id' => $idNoticia
        ]);
    }

    // Redirigir
    header("Location: noticia.php");
    exit;
}
?>
