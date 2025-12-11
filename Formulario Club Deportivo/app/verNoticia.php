<?php
require_once 'conexion.php';

$id = $_GET["id"];

$sql = "SELECT * FROM noticias WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$noticia = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="css/estilos.css">
<title><?= htmlspecialchars($noticia["titulo"]) ?></title>
</head>
<body class="noticia-body">
<div class="container">

<header>
    <h1 class="titulo-club"><?= htmlspecialchars($noticia["titulo"]) ?></h1>
    <div id="nav"></div>
</header>

<main class="ver-noticia">
    <article class="noticia-detalle">
        <!-- La imagen ahora es clicable -->
        <img id="imagenNoticia" src="uploads/noticias/<?= htmlspecialchars($noticia['imagen']) ?>" alt="<?= htmlspecialchars($noticia['titulo']) ?>" class="imagen-noticia clickable">

        <div class="contenido-noticia">
            <!-- Convertimos saltos de línea en <br> pero el contenedor aplica formato legible -->
            <p class="texto-noticia"><?= nl2br(htmlspecialchars($noticia["contenido"])) ?></p>
        </div>

        <div class="contenedor-botones">
            <a href="noticias.php" class="btn-atras"><span>Volver</span></a>
        </div>
    </article>
</main>

<!-- =======================
     VENTANA MODAL
======================== -->
<div id="miModal" class="modal-imagen">
  <span class="cerrar-modal">&times;</span>
  <img class="modal-contenido" id="imagenGrande">
</div>

<div id="footer"></div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>
<script src="js/modalVerNoticia.js"></script>
</div>
</body>
</html>
