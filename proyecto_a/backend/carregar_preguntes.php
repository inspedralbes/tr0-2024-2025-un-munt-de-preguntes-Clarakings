<?php
// Iniciar la sesión
session_start();

// Cargar el archivo JSON
$json_file = 'preguntes.json';
$json_data = file_get_contents($json_file);

// Decodificar el JSON en un array asociativo
$preguntas = json_decode($json_data, true)['preguntes'];

// Seleccionar 10 preguntas al azar
$preguntas_aleatorias = array_rand($preguntas, 10);

// Crear un array con las preguntas seleccionadas
$preguntas_seleccionadas = [];
foreach ($preguntas_aleatorias as $indice) {
    $preguntas_seleccionadas[] = $preguntas[$indice];
}

// Enviar las preguntas seleccionadas en formato JSON
header('Content-Type: application/json');
echo json_encode($preguntas_seleccionadas);
?>