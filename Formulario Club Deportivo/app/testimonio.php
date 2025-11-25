<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Comentario</title>
</head>
<body class="testimonio-body">
    <header>
        <h1 class="titulo-club">Nuevo Comentario</h1>
        <div id="nav"></div>
    </header>

        <form action="" method="post" enctype="multipart/form-data" id="formularioTestimonio">
        <div class="bloque-form">
            <label for="autor">Autor del comentario</label>
            <input type="text" name="autor" id="autor">
            <span id="autorError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="testimonio">Comentario</label>
            <textarea maxlength="100" id="testimonio" name="testimonio"></textarea>
            <p><span id="contador">0</span>/100 caracteres</p>
            <span id="testimonioError" class="error"></span>
        </div>

        <!-- Contenedor para los botones -->
        <div class="contenedor-botones">
            <button type="submit"><span>Enviar</span></button>
            <a href="comentario.php" class="btn-atras"><span>Atrás</span></a>
        </div>
    </form>

    <div id="footer"></div>

    <script src="js/funcionesTestimonio.js"></script>
    <script src="js/nav.js"></script>
    <script src="js/footer.js"></script>
</body>
</html>