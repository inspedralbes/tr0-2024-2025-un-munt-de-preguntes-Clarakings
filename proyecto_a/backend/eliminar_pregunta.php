<?php
// Iniciar la sesión
session_start();

// Incluir el archivo de conexión
include 'conexion.php';

// Obtener los datos enviados desde el frontend
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Validar que se ha recibido la pregunta a eliminar
if (!isset($data['pregunta'])) {
    echo json_encode(['error' => 'Datos incompletos.']);
    exit();
}

// Preparar la consulta para eliminar la pregunta
$sql = "DELETE FROM preguntes WHERE pregunta = ?"; // Cambia 'preguntes' por el nombre real de tu tabla
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $data['pregunta']); // Vincular la pregunta como parámetro

// Ejecutar la consulta
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['message' => 'Pregunta eliminada correctamente.']);
    } else {
        echo json_encode(['message' => 'No se encontró la pregunta.']);
    }
} else {
    echo json_encode(['error' => 'Error al eliminar la pregunta: ' . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
