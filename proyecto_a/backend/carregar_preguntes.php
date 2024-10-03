<?php
// Iniciar la sesión
session_start();

// Configuración de la base de datos
$host = 'localhost'; // Cambia esto a tu host de la base de datos
$usuario = 'root'; // Cambia esto a tu usuario
$password = ''; // Añade aquí la contraseña si es necesario
$base_datos = 'autoescuela'; // Cambia esto al nombre de tu base de datos

// Conectar a la base de datos
$conn = new mysqli($host, $usuario, $password, $base_datos);

// Comprobar la conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

// Consultar las preguntas y sus respuestas
$sql = "SELECT id, pregunta, resposta_correcta, resposta_incorrecta_1, resposta_incorrecta_2, resposta_incorrecta_3, imatge FROM preguntes";
$result = $conn->query($sql);

// Verificar si se obtuvieron resultados
if ($result->num_rows > 0) {
    $preguntas = [];

    // Recorrer las preguntas
    while ($row = $result->fetch_assoc()) {
        // Agregar cada pregunta al array
        $preguntas[] = [
            'pregunta' => $row['pregunta'],
            'resposta_correcta' => $row['resposta_correcta'],
            'respostes_incorrectes' => [
                $row['resposta_incorrecta_1'],
                $row['resposta_incorrecta_2'],
                $row['resposta_incorrecta_3']
            ],
            'imatge' => $row['imatge']
        ];
    }

    // Barajar todas las preguntas
    shuffle($preguntas);

    // Crear un array con las preguntas seleccionadas
    $preguntas_seleccionadas = [];
    $preguntas_a_enviar = []; // Este array será para enviar al frontend

    foreach ($preguntas as $pregunta_actual) {
        // Combinar respuestas correctas e incorrectas
        $respuestas = array_merge([$pregunta_actual['resposta_correcta']], $pregunta_actual['respostes_incorrectes']);
        
        // Mezclar las respuestas
        shuffle($respuestas);
        
        // Almacenar la pregunta con la respuesta correcta en la sesión
        $preguntas_seleccionadas[] = [
            'pregunta' => $pregunta_actual['pregunta'],
            'resposta_correcta' => $pregunta_actual['resposta_correcta'],
            'respuestas' => $respuestas,
            'imatge' => $pregunta_actual['imatge']
        ];

        // Crear una copia sin la respuesta correcta para enviar al frontend
        $preguntas_a_enviar[] = [
            'pregunta' => $pregunta_actual['pregunta'],
            'respuestas' => $respuestas,
            'imatge' => $pregunta_actual['imatge']
        ];
    }

    // Guardar las preguntas seleccionadas con la respuesta correcta en la sesión
    $_SESSION['preguntas'] = $preguntas_seleccionadas;

    // Enviar solo las preguntas sin la respuesta correcta al frontend
    header('Content-Type: application/json');
    echo json_encode($preguntas_a_enviar);
} else {
    echo json_encode(['error' => 'No se encontraron preguntas en la base de datos']);
}

// Cerrar la conexión
$conn->close();
?>
