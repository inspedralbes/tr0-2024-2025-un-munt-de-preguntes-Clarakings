<?php
// Iniciar la sesión
session_start();

// Cargar preguntas desde el archivo JSON
$json= file_get_contents('preguntas.json');
$questions = json_decode('preguntas.json', true);

