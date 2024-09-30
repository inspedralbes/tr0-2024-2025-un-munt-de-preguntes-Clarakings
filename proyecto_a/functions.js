let data;
let estadoDeLaPartida = {
    contadorPreguntes: 0,
    preguntes: [],
    respuestasSeleccionadas: [] // Aquí almacenamos las respuestas seleccionadas por el usuario
};

// Cargar las preguntas desde el backend
fetch('http://localhost:8888/proyecto_a/backend/carregar_preguntes.php')
    .then(response => response.json())
    .then(info => {
        console.log(info);
        data = info; // Asignamos las preguntas al objeto data
        estadoDeLaPartida.preguntes = data;
        mostrarPreguntaActual(); // Iniciamos el test con la primera pregunta
    });

// Función para mostrar la pregunta actual
function mostrarPreguntaActual() {
    const preguntaActual = estadoDeLaPartida.preguntes[estadoDeLaPartida.contadorPreguntes];

    let htmlString = '';
    htmlString += "<h2>Test de Autoescuela</h2>";

    // Mostrar la pregunta
    htmlString += "<p>" + preguntaActual.pregunta + "</p>";

    // Mostrar la imagen si existe
    if (preguntaActual.imatge) {
        htmlString += "<img src='imagenes/" + preguntaActual.imatge + "' width='200'><br>";
    }

    // Mostrar las respuestas
    htmlString += "<div id='pregunta" + estadoDeLaPartida.contadorPreguntes + "'>";
    for (let j = 0; j < preguntaActual.respuestas.length; j++) {
        htmlString += "<button class='respuesta' id='respuesta-" + estadoDeLaPartida.contadorPreguntes + "-" + j + "' onclick='marcarRespuesta(" + estadoDeLaPartida.contadorPreguntes + ", \"" + preguntaActual.respuestas[j] + "\")'>" + preguntaActual.respuestas[j] + "</button><br>";
    }
    htmlString += "</div><br>";

    // Mostrar el contenido en el contenedor
    document.getElementById("test-container").innerHTML = htmlString;
}

// Función para marcar y guardar la respuesta seleccionada
function marcarRespuesta(preguntaIndex, respuestaSeleccionada) {
    console.log("Pregunta index:", preguntaIndex); // Debug: Comprobamos que el índice de la pregunta es correcto
    console.log("Respuesta seleccionada:", respuestaSeleccionada); // Debug: Comprobamos que la respuesta seleccionada es correcta

    // Verificar que data esté definido y tenga preguntas
    if (data && data[preguntaIndex]) {
        // Almacenar la respuesta seleccionada en el estado de la partida
        estadoDeLaPartida.respuestasSeleccionadas[preguntaIndex] = {
            pregunta: data[preguntaIndex].pregunta,
            respuestaSeleccionada: respuestaSeleccionada
        };
        console.log("Respuesta marcada para la pregunta " + (preguntaIndex + 1) + ": " + respuestaSeleccionada);

        // Después de marcar la respuesta, pasar a la siguiente pregunta o terminar el test
        siguientePregunta();
    } else {
        console.error('Error: Pregunta no encontrada en el índice ' + preguntaIndex);
    }
}

// Función para pasar a la siguiente pregunta
function siguientePregunta() {
    // Incrementar el contador de preguntas
    estadoDeLaPartida.contadorPreguntes++;

    // Si aún quedan preguntas, mostrar la siguiente pregunta
    if (estadoDeLaPartida.contadorPreguntes < estadoDeLaPartida.preguntes.length) {
        mostrarPreguntaActual();
    } 
    // Si ya no quedan preguntas, enviar las respuestas al backend
    else {
        enviarRespuestas();
    }
}

// Función para enviar las respuestas seleccionadas al backend
function enviarRespuestas() {
    // Crear un objeto con las respuestas seleccionadas
    const respuestasAEnviar = estadoDeLaPartida.respuestasSeleccionadas;

    // Enviar las respuestas al backend mediante fetch
    fetch('http://localhost:8888/proyecto_a/backend/corregir_respuestas.php', {
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
    let htmlString = "<h2>Resultados</h2>";
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

        htmlString += htmlRespuesta + "<hr>";
    }

    // Mostrar los resultados finales
    document.getElementById("test-container").innerHTML = htmlString;
}
