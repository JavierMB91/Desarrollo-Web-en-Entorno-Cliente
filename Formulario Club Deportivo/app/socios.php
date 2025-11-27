<?php
require_once 'conexion.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sección Socios</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>

<body class="socios-body">

<h1 class="titulo-club">Sección Socios</h1>

<div id="nav"></div>

<div class="container">

    <!-- ======================== -->
    <!-- ESTADO DE CONEXIÓN -->
    <!-- ======================== -->
    <div id="connection-status">
        <?php
            // ========================
            // 1. Búsqueda
            // ========================
            $busqueda = $_GET['q'] ?? '';

            $sql = "SELECT * FROM usuarios 
                    WHERE rol='socio'
                    AND (nombre LIKE :q OR telefono LIKE :q)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['q' => "%$busqueda%"]);
        ?>
    </div>

    <!-- ======================== -->
    <!-- BUSCADOR + BOTONES -->
    <!-- ======================== -->
    <main>
        <form method="get" action="socios.php">
            <input type="text" name="q" 
                   placeholder="Buscar por nombre o teléfono"
                   value="<?= htmlspecialchars($busqueda) ?>">

            <div class="contenedor-botones">
                <button type="submit"><span>Buscar</span></button>
                <a href="nuevoSocio.php" class="btn-atras"><span>Agregar nuevo socio</span></a>
                <a href="socios.php" class="btn-atras"><span>Mostrar todos</span></a>
            </div>
        </form>
    </main>

    <!-- ======================== -->
    <!-- LISTADO DE SOCIOS -->
    <!-- ======================== -->

    <h2 class="titulo-club">Listado de socios</h2>

    <div class="socios-lista">
        <?php
        if ($stmt->rowCount() > 0) {

            while ($socio = $stmt->fetch(PDO::FETCH_ASSOC)) {
                
                echo '<div class="socio-card">';

                // FOTO
                echo '<img src="' . htmlspecialchars($socio['foto']) . '" width="100" alt="Foto socio">';

                // DATOS
                echo '<p><strong>Nombre:</strong> ' . htmlspecialchars($socio['nombre']) . '</p>';
                echo '<p><strong>Edad:</strong> ' . htmlspecialchars($socio['edad']) . '</p>';
                echo '<p><strong>Teléfono:</strong> ' . htmlspecialchars($socio['telefono']) . '</p>';

                // BOTÓN EDITAR
                echo '<div class="contenedor-botones">
                        <a href="editarSocio.php?id=' . $socio['id'] . '" class="btn-atras">
                            <span>Editar</span>
                        </a>
                      </div>';

                echo '</div>';
            }

        } else {
            echo "<p>No se encontraron socios.</p>";
        }
        ?>
    </div>

    <div class="contenedor-botones">
        <a href="index.php" class="btn-atras"><span>Atrás</span></a>
    </div>

</div>

<div id="footer"></div>

<script src="js/nav.js"></script>
<script src="js/footer.js"></script>
<script src="js/transiciones.js"></script>

</body>
</html>
