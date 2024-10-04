function mostrarMenuInicial() {
    let htmlString = "<h2>Bienvenido al Test de Autoescuela</h2>";
    htmlString += "<button id='boton-agregar' onclick='mostrarFormularioAgregarPregunta()'>Añadir Pregunta</button><br><br>";
    htmlString += "<button id='boton-eliminar' onclick='mostrarFormularioEliminarPregunta()'>Eliminar Pregunta</button><br><br>";
    htmlString += "<button id='boton-modificar' onclick='mostrarFormularioModificarPregunta()'>Modificar Pregunta</button><br><br>";
    htmlString += "<button id='boton-ver-todas' onclick='mostrarTodasLasPreguntas()'>Ver Todas las Preguntas</button>";
    document.getElementById("all").innerHTML = htmlString;
}

// Agrega esta función para mostrar el formulario de agregar pregunta
function mostrarFormularioAgregarPregunta() {
    let htmlString = "<h2>Añadir una Nueva Pregunta</h2>";
    htmlString += "<label for='nuevaPregunta'>Pregunta:</label><br>";
    htmlString += "<input type='text' id='nuevaPregunta' name='nuevaPregunta'><br><br>";
    htmlString += "<label for='respuestaCorrecta'>Respuesta Correcta:</label><br>";
    htmlString += "<input type='text' id='respuestaCorrecta' name='respuestaCorrecta'><br><br>";
    htmlString += "<label for='respuestaIncorrecta1'>Respuesta Incorrecta 1:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta1' name='respuestaIncorrecta1'><br><br>";
    htmlString += "<label for='respuestaIncorrecta2'>Respuesta Incorrecta 2:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta2' name='respuestaIncorrecta2'><br><br>";
    htmlString += "<label for='respuestaIncorrecta3'>Respuesta Incorrecta 3:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta3' name='respuestaIncorrecta3'><br><br>";
    htmlString += "<button id='boton-agregar' onclick='agregarPregunta()'>Agregar Pregunta</button>";

    document.getElementById("all").innerHTML = htmlString;
}

// Función para agregar la pregunta al backend
function agregarPregunta() {
    const nuevaPregunta = document.getElementById('nuevaPregunta').value;
    const respuestaCorrecta = document.getElementById('respuestaCorrecta').value;
    const respuestaIncorrecta1 = document.getElementById('respuestaIncorrecta1').value;
    const respuestaIncorrecta2 = document.getElementById('respuestaIncorrecta2').value;
    const respuestaIncorrecta3 = document.getElementById('respuestaIncorrecta3').value;

    // Validar que todos los campos estén completos
    if (!nuevaPregunta || !respuestaCorrecta || !respuestaIncorrecta1 || !respuestaIncorrecta2 || !respuestaIncorrecta3) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Enviar la nueva pregunta al backend
    fetch('http://localhost:8888/proyecto_a/backend/agregar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pregunta: nuevaPregunta,
            respuestaCorrecta: respuestaCorrecta,
            respuestaIncorrecta1: respuestaIncorrecta1,
            respuestaIncorrecta2: respuestaIncorrecta2,
            respuestaIncorrecta3: respuestaIncorrecta3
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
        mostrarMenuInicial(); // Volver al menú inicial
    })
    .catch(error => {
        console.error('Error al agregar la pregunta:', error);
    });
}

// Función para mostrar el formulario de eliminar pregunta
function mostrarFormularioEliminarPregunta() {
    let htmlString = "<h2>Eliminar una Pregunta</h2>";
    htmlString += "<label for='preguntaEliminar'>Pregunta a Eliminar:</label><br>";
    htmlString += "<input type='text' id='preguntaEliminar' name='preguntaEliminar'><br><br>";
    htmlString += "<button id='boton-eliminar' onclick='eliminarPregunta()'>Eliminar Pregunta</button>";
    
    document.getElementById("all").innerHTML = htmlString;
}

// Función para eliminar la pregunta del backend
function eliminarPregunta() {
    const preguntaEliminar = document.getElementById('preguntaEliminar').value;

    // Validar que el campo no esté vacío
    if (!preguntaEliminar) {
        alert('Por favor, ingresa la pregunta que deseas eliminar.');
        return;
    }

    // Enviar la pregunta a eliminar al backend
    fetch('http://localhost:8888/proyecto_a/backend/eliminar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pregunta: preguntaEliminar
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
        mostrarMenuInicial(); // Volver al menú inicial
    })
    .catch(error => {
        console.error('Error al eliminar la pregunta:', error);
    });
}
function buscarPregunta() {
    const preguntaModificar = document.getElementById('preguntaModificar').value;

    if (!preguntaModificar) {
        alert('Por favor, ingresa la pregunta que deseas modificar.');
        return;
    }

    fetch('http://localhost:8888/proyecto_a/backend/buscar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pregunta: preguntaModificar })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('nuevaPregunta').value = data.pregunta;
            document.getElementById('respuestaCorrecta').value = data.respuesta_correcta;
            document.getElementById('respuestaIncorrecta1').value = data.respuesta_incorrecta_1;
            document.getElementById('respuestaIncorrecta2').value = data.respuesta_incorrecta_2;
            document.getElementById('respuestaIncorrecta3').value = data.respuesta_incorrecta_3;
            document.getElementById('formModificar').style.display = 'block'; // Mostrar el formulario de modificación
        }
    })
    .catch(error => {
        console.error('Error al buscar la pregunta:', error);
    });
}

function mostrarFormularioModificarPregunta() {
    let htmlString = "<h2>Modificar una Pregunta</h2>";
    htmlString += "<label for='preguntaModificar'>Pregunta a Modificar:</label><br>";
    htmlString += "<input type='text' id='preguntaModificar' name='preguntaModificar' placeholder='Introduce la pregunta'><br><br>";
    htmlString += "<button id='boton-buscar' onclick='buscarPregunta()'>Buscar Pregunta</button><br><br>";
    htmlString += "<div id='formModificar' style='display:none;'>";
    htmlString += "<h3>Modificar Respuestas</h3>";
    htmlString += "<label for='nuevaPregunta'>Nueva Pregunta:</label><br>";
    htmlString += "<input type='text' id='nuevaPregunta' name='nuevaPregunta'><br><br>";
    htmlString += "<label for='respuestaCorrecta'>Nueva Respuesta Correcta:</label><br>";
    htmlString += "<input type='text' id='respuestaCorrecta' name='respuestaCorrecta'><br><br>";
    htmlString += "<label for='respuestaIncorrecta1'>Nueva Respuesta Incorrecta 1:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta1' name='respuestaIncorrecta1'><br><br>";
    htmlString += "<label for='respuestaIncorrecta2'>Nueva Respuesta Incorrecta 2:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta2' name='respuestaIncorrecta2'><br><br>";
    htmlString += "<label for='respuestaIncorrecta3'>Nueva Respuesta Incorrecta 3:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta3' name='respuestaIncorrecta3'><br><br>";
    htmlString += "<button id='boton-modificar' onclick='modificarPregunta()'>Modificar Pregunta</button>";
    htmlString += "</div>";

    document.getElementById("all").innerHTML = htmlString;
}

function modificarPregunta() {
    const nuevaPregunta = document.getElementById('nuevaPregunta').value;
    const respuestaCorrecta = document.getElementById('respuestaCorrecta').value;
    const respuestaIncorrecta1 = document.getElementById('respuestaIncorrecta1').value;
    const respuestaIncorrecta2 = document.getElementById('respuestaIncorrecta2').value;
    const respuestaIncorrecta3 = document.getElementById('respuestaIncorrecta3').value;

    // Validar que todos los campos estén completos
    if (!nuevaPregunta || !respuestaCorrecta || !respuestaIncorrecta1 || !respuestaIncorrecta2 || !respuestaIncorrecta3) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Enviar la nueva pregunta al backend
    fetch('http://localhost:8888/proyecto_a/backend/modificar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pregunta: nuevaPregunta,
            respuestaCorrecta: respuestaCorrecta,
            respuestaIncorrecta1: respuestaIncorrecta1,
            respuestaIncorrecta2: respuestaIncorrecta2,
            respuestaIncorrecta3: respuestaIncorrecta3
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
        mostrarMenuInicial(); // Volver al menú inicial
    })
    .catch(error => {
        console.error('Error al modificar la pregunta:', error);
    });
}

// Nueva función para mostrar todas las preguntas
function mostrarTodasLasPreguntas() {
    fetch('http://localhost:8888/proyecto_a/backend/ver_todas_preguntas.php')
        .then(response => response.json())
        .then(data => {
            let htmlString = "<h2>Todas las Preguntas</h2>";
            if (data.length > 0) {
                data.forEach(pregunta => {
                    htmlString += `<div>
                        <h4>Pregunta: ${pregunta.pregunta}</h4>
                        <p>Respuesta Correcta: ${pregunta.respuesta_correcta}</p>
                        <p>Respuesta Incorrecta 1: ${pregunta.respuesta_incorrecta_1}</p>
                        <p>Respuesta Incorrecta 2: ${pregunta.respuesta_incorrecta_2}</p>
                        <p>Respuesta Incorrecta 3: ${pregunta.respuesta_incorrecta_3}</p>
                        <hr>
                    </div>`;
                });
            } else {
                htmlString += "<p>No hay preguntas disponibles.</p>";
            }
            document.getElementById("all").innerHTML = htmlString;
        })
        .catch(error => {
            console.error('Error al cargar las preguntas:', error);
        });
}


// Iniciar la aplicación mostrando el menú inicial
mostrarMenuInicial();
function mostrarMenuInicial() {
    let htmlString = "<h2>Bienvenido al Test de Autoescuela</h2>";
    htmlString += "<button id='boton-agregar' onclick='mostrarFormularioAgregarPregunta()'>Añadir Pregunta</button><br><br>";
    htmlString += "<button id='boton-eliminar' onclick='mostrarFormularioEliminarPregunta()'>Eliminar Pregunta</button><br><br>";
    htmlString += "<button id='boton-modificar' onclick='mostrarFormularioModificarPregunta()'>Modificar Pregunta</button><br><br>";
    htmlString += "<button id='boton-ver-todas' onclick='mostrarTodasLasPreguntas()'>Ver Todas las Preguntas</button>";
    document.getElementById("all").innerHTML = htmlString;
}

// Agrega esta función para mostrar el formulario de agregar pregunta
function mostrarFormularioAgregarPregunta() {
    let htmlString = "<h2>Añadir una Nueva Pregunta</h2>";
    htmlString += "<label for='nuevaPregunta'>Pregunta:</label><br>";
    htmlString += "<input type='text' id='nuevaPregunta' name='nuevaPregunta'><br><br>";
    htmlString += "<label for='respuestaCorrecta'>Respuesta Correcta:</label><br>";
    htmlString += "<input type='text' id='respuestaCorrecta' name='respuestaCorrecta'><br><br>";
    htmlString += "<label for='respuestaIncorrecta1'>Respuesta Incorrecta 1:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta1' name='respuestaIncorrecta1'><br><br>";
    htmlString += "<label for='respuestaIncorrecta2'>Respuesta Incorrecta 2:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta2' name='respuestaIncorrecta2'><br><br>";
    htmlString += "<label for='respuestaIncorrecta3'>Respuesta Incorrecta 3:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta3' name='respuestaIncorrecta3'><br><br>";
    htmlString += "<button id='boton-agregar' onclick='agregarPregunta()'>Agregar Pregunta</button>";

    document.getElementById("all").innerHTML = htmlString;
}

// Función para agregar la pregunta al backend
function agregarPregunta() {
    const nuevaPregunta = document.getElementById('nuevaPregunta').value;
    const respuestaCorrecta = document.getElementById('respuestaCorrecta').value;
    const respuestaIncorrecta1 = document.getElementById('respuestaIncorrecta1').value;
    const respuestaIncorrecta2 = document.getElementById('respuestaIncorrecta2').value;
    const respuestaIncorrecta3 = document.getElementById('respuestaIncorrecta3').value;

    // Validar que todos los campos estén completos
    if (!nuevaPregunta || !respuestaCorrecta || !respuestaIncorrecta1 || !respuestaIncorrecta2 || !respuestaIncorrecta3) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Enviar la nueva pregunta al backend
    fetch('http://localhost:8888/proyecto_a/backend/agregar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pregunta: nuevaPregunta,
            respuestaCorrecta: respuestaCorrecta,
            respuestaIncorrecta1: respuestaIncorrecta1,
            respuestaIncorrecta2: respuestaIncorrecta2,
            respuestaIncorrecta3: respuestaIncorrecta3
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
        mostrarMenuInicial(); // Volver al menú inicial
    })
    .catch(error => {
        console.error('Error al agregar la pregunta:', error);
    });
}

// Función para mostrar el formulario de eliminar pregunta
function mostrarFormularioEliminarPregunta() {
    let htmlString = "<h2>Eliminar una Pregunta</h2>";
    htmlString += "<label for='preguntaEliminar'>Pregunta a Eliminar:</label><br>";
    htmlString += "<input type='text' id='preguntaEliminar' name='preguntaEliminar'><br><br>";
    htmlString += "<button id='boton-eliminar' onclick='eliminarPregunta()'>Eliminar Pregunta</button>";
    
    document.getElementById("all").innerHTML = htmlString;
}

// Función para eliminar la pregunta del backend
function eliminarPregunta() {
    const preguntaEliminar = document.getElementById('preguntaEliminar').value;

    // Validar que el campo no esté vacío
    if (!preguntaEliminar) {
        alert('Por favor, ingresa la pregunta que deseas eliminar.');
        return;
    }

    // Enviar la pregunta a eliminar al backend
    fetch('http://localhost:8888/proyecto_a/backend/eliminar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pregunta: preguntaEliminar
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
        mostrarMenuInicial(); // Volver al menú inicial
    })
    .catch(error => {
        console.error('Error al eliminar la pregunta:', error);
    });
}
function buscarPregunta() {
    const preguntaModificar = document.getElementById('preguntaModificar').value;

    if (!preguntaModificar) {
        alert('Por favor, ingresa la pregunta que deseas modificar.');
        return;
    }

    fetch('http://localhost:8888/proyecto_a/backend/buscar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pregunta: preguntaModificar })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('nuevaPregunta').value = data.pregunta;
            document.getElementById('respuestaCorrecta').value = data.respuesta_correcta;
            document.getElementById('respuestaIncorrecta1').value = data.respuesta_incorrecta_1;
            document.getElementById('respuestaIncorrecta2').value = data.respuesta_incorrecta_2;
            document.getElementById('respuestaIncorrecta3').value = data.respuesta_incorrecta_3;
            document.getElementById('formModificar').style.display = 'block'; // Mostrar el formulario de modificación
        }
    })
    .catch(error => {
        console.error('Error al buscar la pregunta:', error);
    });
}

function mostrarFormularioModificarPregunta() {
    let htmlString = "<h2>Modificar una Pregunta</h2>";
    htmlString += "<label for='preguntaModificar'>Pregunta a Modificar:</label><br>";
    htmlString += "<input type='text' id='preguntaModificar' name='preguntaModificar' placeholder='Introduce la pregunta'><br><br>";
    htmlString += "<button id='boton-buscar' onclick='buscarPregunta()'>Buscar Pregunta</button><br><br>";
    htmlString += "<div id='formModificar' style='display:none;'>";
    htmlString += "<h3>Modificar Respuestas</h3>";
    htmlString += "<label for='nuevaPregunta'>Nueva Pregunta:</label><br>";
    htmlString += "<input type='text' id='nuevaPregunta' name='nuevaPregunta'><br><br>";
    htmlString += "<label for='respuestaCorrecta'>Nueva Respuesta Correcta:</label><br>";
    htmlString += "<input type='text' id='respuestaCorrecta' name='respuestaCorrecta'><br><br>";
    htmlString += "<label for='respuestaIncorrecta1'>Nueva Respuesta Incorrecta 1:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta1' name='respuestaIncorrecta1'><br><br>";
    htmlString += "<label for='respuestaIncorrecta2'>Nueva Respuesta Incorrecta 2:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta2' name='respuestaIncorrecta2'><br><br>";
    htmlString += "<label for='respuestaIncorrecta3'>Nueva Respuesta Incorrecta 3:</label><br>";
    htmlString += "<input type='text' id='respuestaIncorrecta3' name='respuestaIncorrecta3'><br><br>";
    htmlString += "<button id='boton-modificar' onclick='modificarPregunta()'>Modificar Pregunta</button>";
    htmlString += "</div>";

    document.getElementById("all").innerHTML = htmlString;
}

function modificarPregunta() {
    const nuevaPregunta = document.getElementById('nuevaPregunta').value;
    const respuestaCorrecta = document.getElementById('respuestaCorrecta').value;
    const respuestaIncorrecta1 = document.getElementById('respuestaIncorrecta1').value;
    const respuestaIncorrecta2 = document.getElementById('respuestaIncorrecta2').value;
    const respuestaIncorrecta3 = document.getElementById('respuestaIncorrecta3').value;

    // Validar que todos los campos estén completos
    if (!nuevaPregunta || !respuestaCorrecta || !respuestaIncorrecta1 || !respuestaIncorrecta2 || !respuestaIncorrecta3) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Enviar la nueva pregunta al backend
    fetch('http://localhost:8888/proyecto_a/backend/modificar_pregunta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pregunta: nuevaPregunta,
            respuestaCorrecta: respuestaCorrecta,
            respuestaIncorrecta1: respuestaIncorrecta1,
            respuestaIncorrecta2: respuestaIncorrecta2,
            respuestaIncorrecta3: respuestaIncorrecta3
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
        mostrarMenuInicial(); // Volver al menú inicial
    })
    .catch(error => {
        console.error('Error al modificar la pregunta:', error);
    });
}

// Nueva función para mostrar todas las preguntas
function mostrarTodasLasPreguntas() {
    fetch('http://localhost:8888/proyecto_a/backend/ver_todas_preguntas.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Esto mostrará la respuesta en la consola para ver qué se está recibiendo
            let htmlString = "<h2>Todas las Preguntas</h2>";
            if (data.length > 0) {
                data.forEach(pregunta => {
                    htmlString += `<div>
                        <h4>Pregunta: ${pregunta.pregunta}</h4>
                        <p>Respuesta Correcta: ${pregunta.resposta_correcta}</p>
                        <p>Respuesta Incorrecta 1: ${pregunta.resposta_incorrecta_1}</p>
                        <p>Respuesta Incorrecta 2: ${pregunta.resposta_incorrecta_2}</p>
                        <p>Respuesta Incorrecta 3: ${pregunta.resposta_incorrecta_3}</p>
                        <hr>
                    </div>`;
                });
            } else if (data.message) {
                htmlString += `<p>${data.message}</p>`;
            } else {
                htmlString += "<p>No hay preguntas disponibles.</p>";
            }

            // Agregar botón para volver al menú inicial
            htmlString += "<button onclick='mostrarMenuInicial()'>Volver al Menú Inicial</button>";
            document.getElementById("all").innerHTML = htmlString;
        });
}


// Iniciar la aplicación mostrando el menú inicial
mostrarMenuInicial();
