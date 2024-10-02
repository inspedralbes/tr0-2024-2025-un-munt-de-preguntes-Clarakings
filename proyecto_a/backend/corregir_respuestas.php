<?php
// Iniciar la sesión
session_start();

// Comprobar si existen preguntas en la sesión
if (!isset($_SESSION['preguntas'])) {
    echo json_encode(['error' => 'No hay preguntas almacenadas en la sesión.']);
    exit();
}

// Obtener las preguntas desde la sesión
$preguntas = $_SESSION['preguntas'];

// Obtener las respuestas enviadas desde el frontend
$input = file_get_contents("php://input");
$respuestas_seleccionadas = json_decode($input, true);

$resultados = [];

foreach ($respuestas_seleccionadas as $respuesta) {
    foreach ($preguntas as $pregunta) {
        if ($pregunta['pregunta'] == $respuesta['pregunta']) {
            $resultados[] = [
                'pregunta' => $pregunta['pregunta'],
                'respuestaSeleccionada' => $respuesta['respuestaSeleccionada'],
                'respuestaCorrecta' => $pregunta['resposta_correcta'],// Suponiendo que la primera respuesta es la correcta
            ];
        }
    }
}

// Enviar los resultados de vuelta al frontend
header('Content-Type: application/json');
echo json_encode($resultados);
?>
