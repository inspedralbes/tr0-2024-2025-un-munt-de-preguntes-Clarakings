<?php
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
?>
