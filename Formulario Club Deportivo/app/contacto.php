<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Contacto</title>
</head>
<body class="contacto-body">
    <div class="container">
    <header>
        <h1 class="titulo-club">Contacto</h1>
        <div id="nav"></div>
    </header>
    <main>
    <form action="" method="post" id="formularioContacto">
        <div class="bloque-form">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre">
            <span id="nombreError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <span id="emailError" class="error"></span>
        </div>

        <div class="bloque-form">
            <label for="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje"></textarea>
            <span id="mensajeError" class="error"></span>
        </div>

        <div class="contenedor-botones">
            <button type="submit"><span>Enviar</span></button>
            <a href="index.php" class="btn-atras"><span>Atrás</span></a>
        </div>
    </form>
    </main>
    <div id="footer"></div>

    <script src="js/funcionesContacto.js"></script>
    <script src="js/nav.js"></script>
    <script src="js/footer.js"></script>
    </div>
</body>
</html>
