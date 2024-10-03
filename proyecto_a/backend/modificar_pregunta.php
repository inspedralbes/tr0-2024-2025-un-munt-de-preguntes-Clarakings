<?php
// Iniciar la sesión
session_start();

// Habilitar la visualización de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de la base de datos
$host = 'localhost';
$usuario = 'root';
$password = ''; // Añade tu contraseña
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

// Validar los datos
if (!isset($data['pregunta'], $data['respuestaCorrecta'], $data['respuestaIncorrecta1'], $data['respuestaIncorrecta2'], $data['respuestaIncorrecta3'])) {
    echo json_encode(['error' => 'Datos incompletos.']);
    exit();
}

// Preparar la consulta para actualizar la pregunta
$sql = "UPDATE preguntes SET pregunta = ?, resposta_correcta = ?, resposta_incorrecta_1 = ?, resposta_incorrecta_2 = ?, resposta_incorrecta_3 = ? WHERE pregunta = ?";
$stmt = $conn->prepare($sql);

// Asegúrate de pasar todos los parámetros correctamente
$stmt->bind_param('ssssss', $data['pregunta'], $data['respuestaCorrecta'], $data['respuestaIncorrecta1'], $data['respuestaIncorrecta2'], $data['respuestaIncorrecta3'], $data['pregunta']);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['message' => 'Pregunta modificada correctamente.']);
} else {
    echo json_encode(['error' => 'Error al modificar la pregunta: ' . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
