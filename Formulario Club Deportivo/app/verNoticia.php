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
<style>
    /* Estilos para el Modal (Lightbox) de la imagen */
    .modal-imagen {
        display: none; /* Oculto por defecto */
        position: fixed; /* Se queda fijo en la pantalla */
        z-index: 1000; /* Se asegura que esté por encima de todo */
        padding-top: 60px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto; /* Permite scroll si la imagen es muy grande */
        background-color: rgba(0, 0, 0, 0.9); /* Fondo negro semitransparente */
        cursor: pointer; /* Cambia el cursor para indicar que se puede cerrar */
    }

    .modal-contenido {
        margin: auto;
        display: block;
        width: auto;
        max-width: 80%;
        max-height: 80vh;
    }

    .cerrar-modal {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
    }

    .cerrar-modal:hover,
    .cerrar-modal:focus {
        color: #bbb;
        text-decoration: none;
        cursor: pointer;
    }
    .imagen-noticia {
        cursor: zoom-in;
    }
</style>
</head>
<body class="noticia-body">
<div class="container">

<header>
    <h1 class="titulo-club"><?= htmlspecialchars($noticia["titulo"]) ?></h1>
    <div id="nav"></div>
</header>

<main class="ver-noticia">
    <article class="noticia-detalle">
        <img src="uploads/noticias/<?= htmlspecialchars($noticia['imagen']) ?>" alt="<?= htmlspecialchars($noticia['titulo']) ?>" class="imagen-noticia">
        <!-- La imagen ahora es clicable -->
        <img id="imagenNoticia" src="uploads/noticias/<?= htmlspecialchars($noticia['imagen']) ?>" alt="<?= htmlspecialchars($noticia['titulo']) ?>" class="imagen-noticia">


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

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos del DOM
    const modal = document.getElementById("miModal");
    const img = document.getElementById("imagenNoticia");
    const modalImg = document.getElementById("imagenGrande");
    const span = document.getElementsByClassName("cerrar-modal")[0];

    // Cuando el usuario hace clic en la imagen, abrir el modal
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    // Cuando el usuario hace clic en <span> (x) o en el fondo, cerrar el modal
    const cerrar = () => modal.style.display = "none";
    span.onclick = cerrar;
    modal.onclick = (event) => { if(event.target === modal) cerrar(); };
});
</script>
</div>
</body>
</html>
