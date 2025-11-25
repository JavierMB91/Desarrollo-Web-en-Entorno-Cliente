<?php
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

<header>
    <h1 class="titulo-club"><?= htmlspecialchars($noticia["titulo"]) ?></h1>
    <div id="nav"></div>
</header>

<main class="ver-noticia">
    <article class="noticia-detalle">
        <img src="<?= htmlspecialchars($noticia["imagen"]) ?>" 
     class="imagen-noticia" 
     alt="<?= htmlspecialchars($noticia["titulo"]) ?>">



        <div class="contenido-noticia">
            <!-- Convertimos saltos de línea en <br> pero el contenedor aplica formato legible -->
            <p class="texto-noticia"><?= nl2br(htmlspecialchars($noticia["contenido"])) ?></p>
        </div>

        <div class="contenedor-botones">
            <a href="noticias.php" class="btn-atras"><span>Volver</span></a>
        </div>
    </article>
</main>

<div id="footer"></div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
</body>
</html>
