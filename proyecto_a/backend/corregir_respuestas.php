<?php
// Cargar el archivo JSON con las preguntas y respuestas correctas
$json_file = 'preguntes.json';
$json_data = file_get_contents($json_file);
$preguntas = json_decode($json_data, true)['preguntes'];

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
                'respuestaCorrecta' => $pregunta['resposta_correcta']
            ];
        }
    }
}

// Enviar los resultados de vuelta al frontend
header('Content-Type: application/json');
echo json_encode($resultados);
?>
