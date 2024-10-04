<?php
// Iniciar la sesión
session_start();

// Incluir el archivo de conexión
include 'conexion.php';

// Preparar la consulta para obtener todas las preguntas
$sql = "SELECT pregunta, resposta_correcta, resposta_incorrecta_1, resposta_incorrecta_2, resposta_incorrecta_3 FROM preguntes";
$result = $conn->query($sql);

$preguntas = [];
if ($result->num_rows > 0) {
    // Almacenar las preguntas en un array
    while ($row = $result->fetch_assoc()) {
        $preguntas[] = $row;
    }
}

// Devolver las preguntas en formato JSON
echo json_encode($preguntas);

// Cerrar la conexión
$conn->close();
?>
