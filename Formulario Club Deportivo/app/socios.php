<?php
require 'conexion.php';

// ========================
// 1. Búsqueda
// ========================
$busqueda = $_GET['q'] ?? '';

$sql = "SELECT * FROM usuarios 
        WHERE rol='socio' 
        AND (nombre LIKE :q OR telefono LIKE :q)";
$stmt = $pdo->prepare($sql);
$stmt->execute(['q' => "%$busqueda%"]);
$socios = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ========================
// 2. Saber si estamos editando un socio
// ========================
$editando = null;

if (isset($_GET['editar'])) {
    $idEditar = $_GET['editar'];

    $sqlEdit = "SELECT * FROM usuarios WHERE id = :id";
    $stmtEdit = $pdo->prepare($sqlEdit);
    $stmtEdit->execute(['id' => $idEditar]);
    $editando = $stmtEdit->fetch(PDO::FETCH_ASSOC);
}

// ========================
// 3. Procesar edición dentro del mismo archivo
// ========================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['accion'] === 'editar') {

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $telefono = $_POST['telefono'];

    $foto = $_POST['foto_actual'];

    if (!empty($_FILES['foto']['name'])) {
        $foto = time() . '_' . $_FILES['foto']['name'];
        move_uploaded_file($_FILES['foto']['tmp_name'], "uploads/fotos/" . $foto);
    }

    $sqlUpdate = "UPDATE usuarios SET 
                    nombre = :nombre,
                    edad = :edad,
                    telefono = :telefono,
                    foto = :foto
                  WHERE id = :id";

    $stmtUpdate = $pdo->prepare($sqlUpdate);
    $stmtUpdate->execute([
        'nombre' => $nombre,
        'edad' => $edad,
        'telefono' => $telefono,
        'foto' => $foto,
        'id' => $id
    ]);

    header("Location: socios.php?edit_ok=1");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sección Socios</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body class="socios-body">

<h1 class = "titulo-club">Sección Socios</h1>

<div id="nav"></div>
<main>
<!-- Buscador -->
<form method="get" action="socios.php">
    <input type="text" name="q" placeholder="Buscar por nombre o teléfono"
           value="<?= htmlspecialchars($busqueda) ?>">
    <div class="contenedor-botones">
    <button type="submit"><span>Buscar</span></button>
    <a href="nuevoSocio.php" class="btn-atras"><span>Agregar nuevo socio</span></a>
    <a href="socios.php" class="btn-atras"><span>Atrás</span></a>
    </div>
</form>
</main>

<!-- Listado de socios -->
<h2 class="titulo-club">Listado de socios</h2>


<?php if (isset($_GET['edit_ok'])): ?>
    <p style="color: green; font-weight: bold;">
        ✔ El socio ha sido editado correctamente.
    </p>
<?php endif; ?>
    
<div class="socios-lista">
<?php foreach ($socios as $socio): ?>
    <div class="socio-card">

        <!-- Si este socio está siendo editado -->
        <?php if ($editando && $editando['id'] == $socio['id']): ?>

            <h3>Editando socio</h3>

            <form method="post" enctype="multipart/form-data">

                <input type="hidden" name="accion" value="editar">
                <input type="hidden" name="id" value="<?= $editando['id'] ?>">
                <input type="hidden" name="foto_actual" value="<?= $editando['foto'] ?>">

                Nombre:<br>
                <input type="text" name="nombre"
                       value="<?= htmlspecialchars($editando['nombre']) ?>"><br><br>

                Edad:<br>
                <input type="number" name="edad"
                       value="<?= htmlspecialchars($editando['edad']) ?>"><br><br>

                Teléfono:<br>
                <input type="text" name="telefono"
                       value="<?= htmlspecialchars($editando['telefono']) ?>"><br><br>

                Foto actual:<br>
                <?php if ($editando['foto']): ?>
                    <img src="<?= htmlspecialchars ($editando['foto']) ?>" width="60"><br><br>
                <?php endif; ?>

                Nueva foto:<br>
                <input type="file" name="foto"><br><br>

                <button type="submit">Guardar cambios</button>
                <a href="socios.php">Cancelar</a>

            </form>

        <?php else: ?>

            <!-- Vista normal -->
            <img src="<?= htmlspecialchars ($socio['foto']) ?>" width="100">
            <p>Nombre: <?= htmlspecialchars($socio['nombre']) ?></p>
            <p>Edad: <?= htmlspecialchars($socio['edad']) ?></p>
            <p>Teléfono: <?= htmlspecialchars($socio['telefono']) ?></p>
            <div class="contenedor-botones">
            <a href="socios.php?editar=<?= $socio['id'] ?>" class="btn-atras"><span>Editar</span></a>
            </div>
        <?php endif; ?>

    </div>
<?php endforeach; ?>
</div>

        <div class="contenedor-botones">
            <a href="index.php" class="btn-atras"><span>Atrás</span></a>
        </div>

    <div id="footer"></div>
<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
</div>
</body>
</html>
