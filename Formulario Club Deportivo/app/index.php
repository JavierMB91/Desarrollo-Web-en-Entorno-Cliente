<?php
require 'conexion.php';

/* =============================
   OBTENER ÚLTIMAS 3 NOTICIAS
   ============================= */
$sqlNoticias = "SELECT id, titulo, contenido, imagen
                FROM noticias
                WHERE fecha_publicacion <= NOW()
                ORDER BY fecha_publicacion DESC
                LIMIT 3";

$stmtNoticias = $pdo->query($sqlNoticias);
$ultimasNoticias = $stmtNoticias->fetchAll(PDO::FETCH_ASSOC);

/* =============================
   TESTIMONIO ALEATORIO
   ============================= */
$sqlTestimonio = "SELECT autor_id, contenido, fecha
                  FROM testimonios
                  ORDER BY RAND()
                  LIMIT 1";

$stmtTestimonio = $pdo->query($sqlTestimonio);
$testimonio = $stmtTestimonio->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/estilos.css">
  <title>Inicio | Club de Lectura</title>
</head>
<body class="index-body">
  <div class="container">

<header>
  <h1 class="titulo-club">CLUB DE LECTURA</h1>
  <div id="nav"></div>
</header>

<main>

  <!-- Bienvenida -->
  <section class="bienvenida">
    <p>Bienvenido al Club de Lectura. Gestiona miembros, actividades, publicaciones y sesiones de lectura.</p>
  </section>

  <!-- Últimas noticias -->
  <section class="ultimas-noticias">
    <h2>Últimas noticias</h2>

    <div class="noticias-grid">
    <?php foreach ($ultimasNoticias as $n): ?>
      <article class="noticia-card">
        <img src="<?= htmlspecialchars($n['imagen']) ?>" 
             alt="<?= htmlspecialchars($n['titulo']) ?>" 
             class="imagen-noticia">
        <h3><?= htmlspecialchars($n['titulo']) ?></h3>
        <p><?= substr(htmlspecialchars($n['contenido']), 0, 120) ?>...</p>
        <a class="btn" href="verNoticia.php?id=<?= $n['id'] ?>">Leer más</a>
      </article>
    <?php endforeach; ?>
    </div>

    <?php if (count($ultimasNoticias) === 0): ?>
      <p>No hay noticias publicadas aún.</p>
    <?php endif; ?>
  </section>

  <!-- Testimonio aleatorio -->
  <section class="testimonio">
    <h2>Testimonio</h2>

    <?php if ($testimonio): ?>
        <blockquote>
            <p>"<?= htmlspecialchars($testimonio['contenido']) ?>"</p>
            <cite>— Autor ID: <?= htmlspecialchars($testimonio['autor_id']) ?></cite>
        </blockquote>
    <?php else: ?>
        <p>No hay testimonios registrados.</p>
    <?php endif; ?>
  </section>

  <!-- Contacto -->
  <section class="contacto">
    <h2>Contacto</h2>
    <p>Si eres socio y quieres más información, contáctanos.</p>
    <a href="contacto.php" class="btn">Ir al formulario</a>
  </section>

</main>

<div id="footer"></div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>
</div>

</body>
</html>
