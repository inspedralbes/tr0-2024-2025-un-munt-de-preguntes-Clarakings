<?php
// Iniciar la sesión
session_start();

// Incluir el archivo de conexión
include 'conexion.php';

// Obtener los datos enviados desde el frontend
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Validar los datos
if (!isset($data['pregunta'], $data['respuestaCorrecta'], $data['respuestaIncorrecta1'], $data['respuestaIncorrecta2'], $data['respuestaIncorrecta3'])) {
    echo json_encode(['error' => 'Datos incompletos.']);
    exit();
}

// Preparar la consulta para insertar la nueva pregunta
$sql = "INSERT INTO preguntes (pregunta, resposta_correcta, resposta_incorrecta_1, resposta_incorrecta_2, resposta_incorrecta_3) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sssss', $data['pregunta'], $data['respuestaCorrecta'], $data['respuestaIncorrecta1'], $data['respuestaIncorrecta2'], $data['respuestaIncorrecta3']);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['message' => 'Pregunta añadida correctamente.']);
} else {
    echo json_encode(['error' => 'Error al añadir la pregunta: ' . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
