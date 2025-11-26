<?php
require 'conexion.php';

// Traemos solo las 3 últimas noticias que ya estén publicadas
$sql = "SELECT id, titulo, contenido, imagen, fecha_publicacion
        FROM noticias
        WHERE fecha_publicacion <= NOW()
        ORDER BY fecha_publicacion DESC
        LIMIT 3";

$stmt = $pdo->query($sql);
$noticias = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Noticias</title>
</head>
<body class="index-body">
    <div class="container">

<header>
    <h1 class="titulo-club">Noticias</h1>
    <div id="nav"></div>
</header>
<main>
<!-- Contenedor para los botones -->
<div class="contenedor-botones">
    <a class="btn" href="noticia.php"><span>Nueva Noticia</span></a>
    <a href="index.php" class="btn-atras"><span>Atrás</span></a>
</div>

<section class="lista-noticias">
    <h2>Últimas noticias</h2>

    <?php if (!empty($noticias)): ?>
        <div class="noticias-grid">
        <?php foreach ($noticias as $n): ?>
            <article class="noticia-card">
                <!-- Ruta absoluta desde la raíz del servidor -->
               <img src="<?= htmlspecialchars($n["imagen"]) ?>" 
     alt="<?= htmlspecialchars($n["titulo"]) ?>" 
     class="imagen-noticia">



                <h3><?= htmlspecialchars($n['titulo']) ?></h3>

                <p><?= substr(htmlspecialchars($n['contenido']), 0, 120) ?>...</p>

                <a class="btn" href="verNoticia.php?id=<?= $n['id'] ?>">Leer más</a>
            </article>
        <?php endforeach; ?>
        </div>
    <?php else: ?>
        <p>No hay noticias disponibles aún.</p>
    <?php endif; ?>
</section>

</main>

<div id="footer"></div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
</div>
</body>
</html>
