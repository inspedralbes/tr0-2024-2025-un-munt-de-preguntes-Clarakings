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
    // Obtener la pregunta actual
    $pregunta_actual = $preguntas[$indice];
    
    // Combinar respuestas correctas e incorrectas
    $respuestas = array_merge([$pregunta_actual['resposta_correcta']], $pregunta_actual['respostes_incorrectes']);
    
    // Mezclar las respuestas
    shuffle($respuestas);
    
    // Crear un nuevo array con la pregunta y las respuestas mezcladas
    $preguntas_seleccionadas[] = [
        'pregunta' => $pregunta_actual['pregunta'],
        'respuestas' => $respuestas,
        'imatge' => $pregunta_actual['imatge']
    ];
}

// Guardar las preguntas seleccionadas en la sesión
$_SESSION['preguntas'] = $preguntas_seleccionadas;

// Enviar las preguntas seleccionadas en formato JSON
header('Content-Type: application/json');
echo json_encode($preguntas_seleccionadas);
?>
