<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $host = getenv("DB_HOST");
    $db   = getenv("DB_NAME");
    $user = getenv("DB_USER");
    $pass = getenv("DB_PASSWORD");

    try {
        $pdo = new PDO(
            "mysql:host=$host;dbname=$db;charset=utf8",
            $user,
            $pass,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }

    $titulo = $_POST["titulo"];
    $contenido = $_POST["contenido"];
    $fecha = $_POST["fecha"];

    /* Procesar imagen */
    $nombreImagen = time() . "_" . $_FILES["imagen"]["name"];
    move_uploaded_file($_FILES["imagen"]["tmp_name"], "uploads/noticias/" . $nombreImagen);

    /* Insertar noticia */
    $sql = "INSERT INTO noticias (titulo, contenido, imagen, fecha_publicacion)
            VALUES (?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$titulo, $contenido, $nombreImagen, $fecha]);

    header("Location: noticias.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Nueva Noticia</title>
</head>
<body class="noticia-body">
<header>
    <h1 class="titulo-club">Nueva Noticia</h1>
    <div id="nav"></div>
</header>

<form action="" method="post" enctype="multipart/form-data" id="formularioNoticia">
    <div class="bloque-form">
        <label for="titulo">Título</label>
        <input type="text" id="titulo" name="titulo">
        <span id="tituloError" class="error"></span>
    </div>

    <div class="bloque-form">
        <label for="contenido">Contenido</label>
        <textarea maxlength="300" id="contenido" name="contenido"></textarea>
        <p><span id="contador">0</span>/300 caracteres</p>
        <span id="noticiaError" class="error"></span>
    </div>

    <div class="bloque-form">
        <label for="fecha">Fecha de publicación</label>
        <input type="date" id="fecha" name="fecha">
        <span id="fechaError" class="error"></span>
    </div>

    <div class="bloque-form">
        <label for="imagen">Imagen asociada</label>
        <input type="file" id="imagen" name="imagen">
        <span id="imagenError" class="error"></span>
    </div>

    <div class="contenedor-botones">
        <button type="submit"><span>Publicar</span></button>
        <a href="noticias.php" class="btn-atras"><span>Atrás</span></a>
    </div>
</form>

<div id="footer"></div>
<script src="js/funcionesNoticia.js"></script>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
</body>
</html>
