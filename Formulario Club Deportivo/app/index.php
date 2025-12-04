<?php
require_once 'conexion.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Inicio</title>
</head>

<body class="index-body">
<div class="container">

<header>
    <h1 class="titulo-club">Libreria</h1>
    <div id="nav"></div>
</header>

<main>

    <!-- ============================ -->
    <!--          NOTICIAS            -->
    <!-- ============================ -->
    <section class="lista-noticias">
    <h2>Últimas noticias</h2>

    <?php
        // Solo noticias cuya fecha ya pasó y solo 3
        $sqlNoticias = "
            SELECT id, titulo, contenido, imagen, fecha_publicacion
            FROM noticias
            WHERE fecha_publicacion <= NOW()
            ORDER BY fecha_publicacion DESC
            LIMIT 3
        ";

        $stmt = $pdo->query($sqlNoticias);

        if ($stmt->rowCount() > 0) {
            echo '<div class="noticias-grid-3">';
            while ($n = $stmt->fetch(PDO::FETCH_ASSOC)) {

                echo '<article class="noticia-card">';
                
                echo '<img src="' . htmlspecialchars($n["imagen"]) . '" class="imagen-noticia" alt="' . htmlspecialchars($n["titulo"]) . '">';
                
                echo '<h3>' . htmlspecialchars($n["titulo"]) . '</h3>';

                // 👉 Mostrar fecha formateada
                echo '<p class="fecha-noticia">' . date("d/m/Y", strtotime($n["fecha_publicacion"])) . '</p>';

            
                
                echo '<a class="btn" href="verNoticia.php?id=' . $n["id"] . '">Leer más</a>';
                echo '</article>';
            }
            echo '</div>';
        } else {
            echo "<p>No hay noticias disponibles aún.</p>";
        }
    ?>
</section>



    <!-- ============================ -->
    <!--        TESTIMONIO            -->
    <!-- ============================ -->
    <section class="testimonio">
    <h2>Testimonio destacado</h2>

    <?php
        // Traer 1 testimonio aleatorio con el nombre del autor (uso de alias correcto)
        $sqlTest = "
            SELECT t.contenido, u.nombre
            FROM testimonios t
            INNER JOIN usuarios u ON t.autor_id = u.id
            ORDER BY RAND()
            LIMIT 1
        ";

        $stmtTest = $pdo->query($sqlTest);

        if ($stmtTest && $stmtTest->rowCount() > 0) {
            $t = $stmtTest->fetch(PDO::FETCH_ASSOC);

            echo '<div class="testimonio-box">';
            echo '<p class="texto-testimonio">"' . htmlspecialchars($t['contenido']) . '"</p>';
            echo '<p class="autor-testimonio">- ' . htmlspecialchars($t['nombre']) . '</p>';
            echo '</div>';
        } else {
            echo "<p>No hay testimonios todavía.</p>";
        }
    ?>
</section>



    <!-- ============================ -->
    <!--        ZONA CONTACTO         -->
    <!-- ============================ -->
    <section class="contacto">
        <p>Si desas contactar con nosotros, usa el siguiente formulario:</p>
        <a href="contacto.php" class="btn-atras">Contacto</a>
    </section>

</main>

<div id="footer"></div>

<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>

</div>
</body>
</html>
