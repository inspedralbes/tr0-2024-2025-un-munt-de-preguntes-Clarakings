let data;
let estadoDeLaPartida = {
    contadorPreguntes: 0,
    preguntes: [],
    respuestasSeleccionadas: [] // Aquí almacenamos las respuestas seleccionadas por el usuario
};

// Cargar las preguntas desde el backend
fetch('http://localhost/proyecto_a/backend/carregar_preguntes.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        mostrarTest(data);
    });

// Función para mostrar las preguntas del test
function mostrarTest(info) {
    data = info;
    let htmlString = '';
    htmlString += "<h2>Test de Autoescuela</h2>";

    for (let i = 0; i < data.length; i++) {
        // Mostrar la pregunta
        htmlString += "<p>" + data[i].pregunta + "</p>";
        
        // Mostrar la imagen si existe
        if (data[i].imatge) {
            htmlString += "<img src='imagenes/" + data[i].imatge + "' width='200'><br>";
        }

        // Mostrar las respuestas
        htmlString += "<div id='pregunta" + i + "'>";
        for (let j = 0; j < data[i].respuestas.length; j++) {
            htmlString += "<button class='respuesta' id='respuesta-" + i + "-" + j + "' onclick='marcarRespuesta(" + i + ", \"" + data[i].respuestas[j] + "\")'>" + data[i].respuestas[j] + "</button><br>";
        }
        htmlString += "</div><br>";
    }

    // Botón para verificar y enviar las respuestas
    htmlString += "<button onclick='enviarRespuestas()'>Enviar Respuestas</button>";

    document.getElementById("test-container").innerHTML = htmlString;
}

// Función para marcar y guardar la respuesta seleccionada
function marcarRespuesta(preguntaIndex, respuestaSeleccionada) {
    // Almacenar la respuesta seleccionada en el estado de la partida
    estadoDeLaPartida.respuestasSeleccionadas[preguntaIndex] = {
        pregunta: data[preguntaIndex].pregunta,
        respuestaSeleccionada: respuestaSeleccionada
    };
    console.log("Respuesta marcada para la pregunta " + (preguntaIndex + 1) + ": " + respuestaSeleccionada);
}

// Función para enviar las respuestas seleccionadas al backend
function enviarRespuestas() {
    // Crear un objeto con las respuestas seleccionadas
    const respuestasAEnviar = estadoDeLaPartida.respuestasSeleccionadas;

    // Enviar las respuestas al backend mediante fetch
    fetch('http://localhost/proyecto_a/backend/corregir_respuestas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(respuestasAEnviar)
    })
    .then(response => response.json())
    .then(resultado => {
        console.log("Resultado de la corrección:", resultado);
        mostrarResultados(resultado);
    })
    .catch(error => {
        console.error('Error al enviar las respuestas:', error);
    });
}

// Función para mostrar los resultados de la corrección
function mostrarResultados(resultado) {
    for (let i = 0; i < resultado.length; i++) {
        const preguntaIndex = i;

        // Limpiar las respuestas anteriores
        let htmlRespuesta = '';

        // Si la respuesta es correcta
        if (resultado[i].respuestaSeleccionada === resultado[i].respuestaCorrecta) {
            htmlRespuesta += "<p>Tu respuesta: " + resultado[i].respuestaSeleccionada + " (Correcta)</p>";
        } 
        // Si la respuesta es incorrecta
        else {
            htmlRespuesta += "<p>Tu respuesta: " + resultado[i].respuestaSeleccionada + " (Incorrecta)</p>";
            htmlRespuesta += "<p>Respuesta correcta: " + resultado[i].respuestaCorrecta + "</p>";
        }

        // Insertar los resultados en el div correspondiente a la pregunta
        document.getElementById("pregunta" + preguntaIndex).innerHTML = htmlRespuesta;
    }
}
