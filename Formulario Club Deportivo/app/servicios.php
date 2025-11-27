<?php
require_once 'conexion.php';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilos.css">
    <title>Lista Servicios</title>
</head>
<body class="index-body">
    
    <!-- ======================== -->
    <!-- ESTADO DE CONEXIÓN -->
    <!-- ======================== -->
    <div id="connection-status">
        <?php
            // ========================
            // 1. Búsqueda
            // ========================
           $busqueda = $_GET['q'] ?? '';

            $sql = "SELECT * FROM servicio 
            WHERE nombre LIKE :q";

            $stmt = $pdo->prepare($sql);
            $stmt->execute(['q' => "%$busqueda%"]);
?>
    </div>

    <header>
        <h1 class="titulo-club">Actividades</h1>
        <div id="nav"></div>
        <div class="container">
    </header>

    <!-- ======================== -->
    <!-- BUSCADOR + BOTONES -->
    <!-- ======================== -->

    <main>
        <form method="get" action="servicios.php">
            <input type="text" name="q" 
                   placeholder="Buscar por nombre de actividad"
                   value="<?= htmlspecialchars($busqueda) ?>">

            <div class="contenedor-botones">
                <button type="submit"><span>Buscar</span></button>
                <a href="servicio.php" class="btn-atras"><span>Agregar nuevo servicio</span></a>
                <a href="servicios.php" class="btn-atras"><span>Mostrar todos</span></a>
            </div>
        </form>

    </main>
     <h2 class="titulo-club">Listado de Servicios</h2>

    <div class="servicios-lista">
        <?php
        if ($stmt->rowCount() > 0) {

            while ($servicio = $stmt->fetch(PDO::FETCH_ASSOC)) {
                
                echo '<div class="servicio-card">';

                // // FOTO
                // echo '<img src="' . htmlspecialchars($servicio['foto']) . '" width="100" alt="Foto servicio">';

                // DATOS
                echo '<p><strong>Nombre:</strong> ' . htmlspecialchars($servicio['nombre']) . '</p>';
                echo '<p><strong>Descripción:</strong> ' . htmlspecialchars($servicio['descripcion']) . '</p>';
                echo '<p><strong>Duración:</strong> ' . htmlspecialchars($servicio['duracion']) . '</p>';
                echo '<p><strong>Precio:</strong> ' . htmlspecialchars($servicio['precio']) . '</p>';

                // BOTÓN EDITAR
                echo '<div class="contenedor-botones">
                        <a href="editarServicio.php?id=' . $servicio['id'] . '" class="btn-atras">
                            <span>Editar</span>
                        </a>
                      </div>';

                echo '</div>';
            }

        } else {
            echo "<p>No se encontraron servicios.</p>";
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