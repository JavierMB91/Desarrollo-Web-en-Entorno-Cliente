<?php
require_once 'conexion.php';

// Obtener todos los usuarios para el select
$stmt = $pdo->query("SELECT id, nombre FROM usuarios ORDER BY nombre");
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Comentario</title>
</head>
<body class="testimonio-body">
    <div class="container">
    <header>
        <h1 class="titulo-club">Nuevo Comentario</h1>
        <div id="nav"></div>
    </header>
<main>
        <form action="insertarComentario.php" method="post" id="formularioTestimonio">
    <div class="bloque-form">
        <label for="autor_id">Autor del comentario</label>
        <select name="autor_id" id="autor_id">
            <?php foreach($usuarios as $u): ?>
                <option value="<?= $u['id'] ?>"><?= htmlspecialchars($u['nombre']) ?></option>
            <?php endforeach; ?>
        </select>
        <span id="autorError" class="error"></span>
    </div>

    <div class="bloque-form">
        <label for="contenido">Comentario</label>
        <textarea maxlength="100" id="contenido" name="contenido"></textarea>
        <p><span id="contador">0</span>/100 caracteres</p>
        <span id="testimonioError" class="error"></span>
    </div>

    <div class="contenedor-botones">
        <button type="submit"><span>Enviar</span></button>
        <a href="comentario.php" class="btn-atras"><span>Atrás</span></a>
    </div>
</form>

</main>

    <div id="footer"></div>

    <script src="js/funcionesTestimonio.js"></script>
    <script src="js/nav.js"></script>
    <script src="js/footer.js"></script>
    <script src="js/transiciones.js"></script>
    </div>
</body>
</html>