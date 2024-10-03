<?php
// Iniciar la sesión
session_start();

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
if (!isset($data['pregunta'])) {
    echo json_encode(['error' => 'Datos incompletos.']);
    exit();
}

// Preparar la consulta para buscar la pregunta
$sql = "SELECT pregunta, resposta_correcta, resposta_incorrecta_1, resposta_incorrecta_2, resposta_incorrecta_3 FROM preguntes WHERE pregunta = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $data['pregunta']);

// Ejecutar la consulta
$stmt->execute();
$stmt->store_result();

// Comprobar si se encontró la pregunta
if ($stmt->num_rows > 0) {
    $stmt->bind_result($pregunta, $respuesta_correcta, $respuesta_incorrecta_1, $respuesta_incorrecta_2, $respuesta_incorrecta_3);
    $stmt->fetch();
    echo json_encode([
        'pregunta' => $pregunta,
        'respuesta_correcta' => $respuesta_correcta,
        'respuesta_incorrecta_1' => $respuesta_incorrecta_1,
        'respuesta_incorrecta_2' => $respuesta_incorrecta_2,
        'respuesta_incorrecta_3' => $respuesta_incorrecta_3
    ]);
} else {
    echo json_encode(['error' => 'Pregunta no encontrada.']);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
