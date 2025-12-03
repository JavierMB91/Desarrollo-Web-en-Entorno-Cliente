<?php
require_once 'conexion.php';

// ==========================
// OBTENER TODOS LOS TESTIMONIOS
// ==========================

$sql = "SELECT 
            t.id AS testimonio_id, 
            u.nombre AS autor, 
            t.contenido, 
            t.fecha
        FROM testimonios t
        JOIN usuarios u ON t.autor_id = u.id
        ORDER BY t.fecha DESC";

$stmt = $pdo->query($sql);
$testimonios = $stmt->fetchAll(PDO::FETCH_ASSOC);


$stmt = $pdo->query($sql);
$testimonios = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Lista Comentarios</title>
</head>

<body class="index-body">
    <div class="container">

    <header>
        <h1 class="titulo-club">Comentarios</h1>
        <div id="nav"></div>
    </header>

    <main>
    <h2 class="titulo-club">Todos los comentarios</h2>
        <!-- BOTONES -->
        <div class="contenedor-botones">
            <a class="btn" href="testimonio.php"><span>Nuevo Comentario</span></a>
        </div>


        <!-- LISTA DE TESTIMONIOS -->


        <?php if (empty($testimonios)): ?>
            <p>No hay comentarios todavía.</p>

        <?php else: ?>

            <div class="testimonios-lista">
<?php foreach ($testimonios as $t): ?>
    <div class="tarjeta-testimonio">


                    <p><strong>ID:</strong> <?= $t["testimonio_id"] ?></p>
                    <p><strong>Autor:</strong> <?= htmlspecialchars($t["autor"]) ?></p>
                    <p><strong>Comentario:</strong> <?= nl2br(htmlspecialchars($t["contenido"])) ?></p>
                    <p class="fecha"><strong>Fecha:</strong> <?= date('d/m/Y', strtotime($t["fecha"])) ?></p>
                    <p class="hora"><strong>Hora:</strong> <?= date('H:i', strtotime($t["fecha"])) ?></p>

                </div>
            <?php endforeach; ?>
</div>

        <?php endif; ?>

    </main>
 <div class="contenedor-botones">
            <a href="index.php" class="btn-atras"><span>Atrás</span></a>
        </div>
    

    <div id="footer"></div>
    <script src="js/nav.js"></script>
    <script src="js/footer.js"></script>
    <script src="js/transiciones.js"></script>

    </div>
</body>
</html>
