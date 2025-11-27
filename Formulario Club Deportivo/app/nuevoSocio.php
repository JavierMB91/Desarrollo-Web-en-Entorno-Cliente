<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Agregar nuevo socio</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
< class="nuevoSocio-body">

<header>
    <h1 class="titulo-club">Nuevo Socio</h1>
    <div id="nav"></div>
</header>
<div class="container">
<h1 class="titulo-club">Agregar nuevo socio</h1>
<main>
<form action="" method="post" enctype="multipart/form-data" id="formularioNuevoSocio">
    <div class="bloque-form">
    <input type="text" name="nombre" placeholder="Nombre">
    </div>
    <div class="bloque-form">
    <input type="number" name="edad" placeholder="Edad">
    </div>
    <div class="bloque-form">
    <input type="text" name="telefono" placeholder="612 - 345 - 678">
    </div>
    <div class="bloque-form">
    <input type="file" name="foto" accept="image/jpg" placeholder="Foto (JPG)">
    </div>
    <div class="contenedor-botones">
            <button type="submit"><span>Agregar socio</span></button>
            <a href="socios.php" class="btn-atras"><span>Atrás</span></a>
    </div>
</form>
</main>
    <div id="footer"></div>
</div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
<script src="js/funcionesAñadirSocio.js"></script>
<script src="js/transiciones.js"></script>
</body>
</html>
