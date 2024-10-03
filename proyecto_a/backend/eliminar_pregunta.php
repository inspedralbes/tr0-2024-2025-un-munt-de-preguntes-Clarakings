<?php
// Iniciar la sesión
session_start();

// Configuración de la base de datos
$host = 'localhost';
$usuario = 'root';
$password = ''; // Añade tu contraseña si es necesario
$base_datos = 'autoescuela';

// Conectar a la base de datos
$conn = new mysqli($host, $usuario, $password, $base_datos);

// Comprobar la conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

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
