let data;
let estadoDeLaPartida = {
    contadorPreguntes: 0,
    preguntes: [],
    respuestasSeleccionadas: [],
    tiempoInicio: null,
    tiempoFin: null,
    intervaloCronometro: null,
    nombreUsuario: '',  // Almacena el nombre del usuario
    cantidadPreguntas: 0  // Almacena la cantidad de preguntas a responder
};

// Función para iniciar el cronómetro
function iniciarCronometro() {
    estadoDeLaPartida.tiempoInicio = new Date();

    estadoDeLaPartida.intervaloCronometro = setInterval(function () {
        const tiempoActual = new Date();
        const tiempoTranscurrido = Math.floor((tiempoActual - estadoDeLaPartida.tiempoInicio) / 1000);

        // Actualiza el cronómetro dentro de test-container
        document.getElementById('cronometro').innerText = "Tiempo: " + tiempoTranscurrido + " segundos";
    }, 1000);
}

// Función para detener el cronómetro
function detenerCronometro() {
    clearInterval(estadoDeLaPartida.intervaloCronometro);
}

// Modificar la función mostrarMenuInicial para incluir la opción de agregar pregunta
function mostrarMenuInicial() {
    document.getElementById('cronometro').classList.add('invisible');
    let htmlString = "<h2>Bienvenido al Test de Autoescuela</h2>";
    htmlString += "<button id='boton-jugar' onclick='preguntarNombreYCantidad()'>Jugar</button><br><br>";
    document.getElementById("test-container").innerHTML = htmlString;
}


// Función para pedir nombre y cantidad de preguntas
function preguntarNombreYCantidad() {
    let htmlString = "<h2>Introduce tu nombre y elige cuántas preguntas quieres responder</h2>";
    htmlString += "<label for='nombreUsuario'>Nombre:</label><br>";
    htmlString += "<input type='text' id='nombreUsuario' name='nombreUsuario'><br><br>";
    htmlString += "<label for='cantidadPreguntas'>Cantidad de preguntas (máximo 20):</label><br>";
    htmlString += "<input type='number' id='cantidadPreguntas' name='cantidadPreguntas' min='1' max='20'><br><br>";
    htmlString += "<button id='boton-iniciar' onclick='validarDatosYIniciarJuego()'>Iniciar Test</button>";

    document.getElementById("test-container").innerHTML = htmlString;
}

// Función para validar los datos e iniciar el juego
function validarDatosYIniciarJuego() {
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const cantidadPreguntas = parseInt(document.getElementById('cantidadPreguntas').value);

    // Validar que el nombre no esté vacío y que la cantidad de preguntas sea válida
    if (!nombreUsuario || isNaN(cantidadPreguntas) || cantidadPreguntas <= 0 || cantidadPreguntas > 20) {
        alert('Por favor, introduce un nombre válido y selecciona una cantidad de preguntas entre 1 y 20.');
        return;
    }

    // Almacenar el nombre y la cantidad de preguntas en el estado
    estadoDeLaPartida.nombreUsuario = nombreUsuario;
    estadoDeLaPartida.cantidadPreguntas = cantidadPreguntas;

    // Iniciar el juego
    iniciarJuego();
}

// Función para iniciar el juego cargando las preguntas desde el backend
function iniciarJuego() {
    // Cargar las preguntas desde el backend
    fetch('http://localhost:8888/proyecto_a/backend/carregar_preguntes.php')
        .then(response => response.json())
        .then(info => {
            console.log(info);
            data = info;

            // Limitar las preguntas según lo que haya elegido el usuario
            estadoDeLaPartida.preguntes = data.slice(0, estadoDeLaPartida.cantidadPreguntas);

            mostrarPreguntaActual();
        });
}

// Función para mostrar la pregunta actual
// Función para mostrar la pregunta actual
function mostrarPreguntaActual() {
    const preguntaActual = estadoDeLaPartida.preguntes[estadoDeLaPartida.contadorPreguntes];

    if (estadoDeLaPartida.contadorPreguntes === 0) {
        // Mostrar el cronómetro cuando empiecen las preguntas
        document.getElementById('cronometro').classList.add('visible'); // Añadir la clase 'visible' para mostrarlo
        iniciarCronometro(); // Iniciar el cronómetro cuando empieza la primera pregunta
    }

    let htmlString = '';
    htmlString += "<h2>Test de Autoescuela</h2>";
    htmlString += "<h3>Nombre: " + estadoDeLaPartida.nombreUsuario + "</h3>";
    htmlString += "<p>" + preguntaActual.pregunta + "</p>";

    if (preguntaActual.imatge) {
        htmlString += "<img src='imagenes/" + preguntaActual.imatge + "' width='200'><br>";
    }

    htmlString += "<div id='pregunta" + estadoDeLaPartida.contadorPreguntes + "'>";
    for (let j = 0; j < preguntaActual.respuestas.length; j++) {
        htmlString += "<button class='respuesta' id='respuesta-" + estadoDeLaPartida.contadorPreguntes + "-" + j + "' onclick='marcarRespuesta(" + estadoDeLaPartida.contadorPreguntes + ", \"" + preguntaActual.respuestas[j] + "\")'>" + preguntaActual.respuestas[j] + "</button><br>";
    }
    htmlString += "</div><br>";

    document.getElementById("test-container").innerHTML = htmlString;
}

// Función para marcar y guardar la respuesta seleccionada
function marcarRespuesta(preguntaIndex, respuestaSeleccionada) {
    console.log("Pregunta index:", preguntaIndex);
    console.log("Respuesta seleccionada:", respuestaSeleccionada);

    if (data && data[preguntaIndex]) {
        estadoDeLaPartida.respuestasSeleccionadas[preguntaIndex] = {
            pregunta: data[preguntaIndex].pregunta,
            respuestaSeleccionada: respuestaSeleccionada
        };
        console.log("Respuesta marcada para la pregunta " + (preguntaIndex + 1) + ": " + respuestaSeleccionada);

        siguientePregunta();
    } else {
        console.error('Error: Pregunta no encontrada en el índice ' + preguntaIndex);
    }
}

// Función para pasar a la siguiente pregunta
function siguientePregunta() {
    estadoDeLaPartida.contadorPreguntes++;

    if (estadoDeLaPartida.contadorPreguntes < estadoDeLaPartida.preguntes.length) {
        mostrarPreguntaActual();
    } else {
        estadoDeLaPartida.tiempoFin = new Date();
        detenerCronometro();
        enviarRespuestas();
    }
}

// Función para enviar las respuestas seleccionadas al backend
function enviarRespuestas() {
    const respuestasAEnviar = estadoDeLaPartida.respuestasSeleccionadas;

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
    let respuestasCorrectas = 0;

    for (let i = 0; i < resultado.length; i++) {
        if (resultado[i].respuestaSeleccionada === resultado[i].respuestaCorrecta) {
            respuestasCorrectas++;
        }
    }

    const tiempoTotal = (estadoDeLaPartida.tiempoFin - estadoDeLaPartida.tiempoInicio) / 1000;

    htmlString += "<h3>Has acertado " + respuestasCorrectas + " de " + resultado.length + " preguntas.</h3>";
    htmlString += "<hr>";

    for (let i = 0; i < resultado.length; i++) {
        let htmlRespuesta = '';

        if (resultado[i].respuestaSeleccionada === resultado[i].respuestaCorrecta) {
            htmlRespuesta += "<p>Pregunta " + (i + 1) + ": Tu respuesta: " + resultado[i].respuestaSeleccionada + " (Correcta)</p>";
        } else {
            htmlRespuesta += "<p>Pregunta " + (i + 1) + ": Tu respuesta: " + resultado[i].respuestaSeleccionada + " (Incorrecta)</p>";
            htmlRespuesta += "<p>Respuesta correcta: " + resultado[i].respuestaCorrecta + "</p>";
        }

        htmlString += htmlRespuesta + "<hr>";
    }

    htmlString += "<h3>Tiempo total: " + Math.floor(tiempoTotal) + " segundos.</h3>";
    htmlString += "<button onclick='mostrarMenuInicial();reiniciarCronometroYEstado()'>Volver al Menú Inicial</button>";
    document.getElementById("test-container").innerHTML = htmlString;
}
function reiniciarCronometroYEstado() {
    // Si el cronómetro está corriendo, lo detenemos
    if (estadoDeLaPartida.intervaloCronometro) {
        clearInterval(estadoDeLaPartida.intervaloCronometro);
    }

    // Reiniciamos las variables del estado de la partida
    estadoDeLaPartida.contadorPreguntes = 0;
    estadoDeLaPartida.preguntes = [];
    estadoDeLaPartida.respuestasSeleccionadas = [];
    estadoDeLaPartida.tiempoInicio = null;
    estadoDeLaPartida.tiempoFin = null;
    estadoDeLaPartida.intervaloCronometro = null;
}
// Llama a la función para mostrar el menú inicial al cargar la página
mostrarMenuInicial();
