let data;
let estadoDeLaPartida = {
    contadorPreguntes: 0,
    preguntes: []
};

fetch('http://localhost/preguntes.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      mostrarTest(data)
      verificarRespuestas(data)
    });


// Función para mostrar las preguntas del test
function mostrarTest(info) {
  data = info.preguntes;
  htmlString='';
  htmlString+="<h2>Test de Autoescuela</h2>";
  
  for (let i = 0; i < data.length; i++) {
      // Mostrar la pregunta
      htmlString+="<p>" + data[i].pregunta + "</p>";
      
      // Mostrar la imagen si existe
      if (data[i].imatge) {
          htmlString+="<img src='imagenes/" + data[i].imatge + "' width='200'><br>";
      }

      htmlString += "<div id='pregunta" + i + "'>";
        htmlString += "<button onclick='marcarRespuesta(\"" + i + "\", \"" + data[i].resposta_correcta + "\")'>" + data[i].resposta_correcta + "</button><br>";
        for (let j = 0; j < data[i].respostes_incorrectes.length; j++) {
            htmlString += "<button onclick='marcarRespuesta(\"" + i + "\", \"" + data[i].respostes_incorrectes[j] + "\")'>" + data[i].respostes_incorrectes[j] + "</button><br>";
        }
        htmlString += "</div><br>";
  }

  // Botón para verificar las respuestas
  /*htmlString+="<button onclick='verificarRespuestas()'>Comprovar respostes</button>";*/
  
  document.getElementById("test-container").innerHTML=htmlString;
  actualizarEstado();
}

function marcarRespuesta(preguntaId, respuesta) {
    estadoDeLaPartida.preguntes[preguntaId].feta = true;
    estadoDeLaPartida.preguntes[preguntaId].resposta = respuesta;
    estadoDeLaPartida.contadorPreguntes++;
    actualizarEstado();

    if (estadoDeLaPartida.contadorPreguntes === data.length) {
        document.getElementById('enviarResultats').style.display = 'block';
    }
}

function actualizarEstado() {
    let estadoString = '<h3>Estado de la Partida</h3>';
    estadoString += '<p>Preguntas respondidas: ' + estadoDeLaPartida.contadorPreguntes + '</p>';
    estadoString += '<ul>';
    estadoDeLaPartida.preguntes.forEach(pregunta => {
        estadoString += '<li>Pregunta ' + pregunta.id + ': ' + (pregunta.feta ? 'Respondida' : 'No respondida') + '</li>';
    });
    estadoString += '</ul>';

    document.getElementById('estat').innerHTML = estadoString;
}

function enviarResultats() {
    console.log('Enviando resultados...');
}

// Función para comprobar cuántas respuestas son correctas
/*function verificarRespuestas(info) {
  data = info.preguntes;
  let correctas = 0;

  for (let i = 0; i < data.length; i++) {
      let opciones = document.getElementsByName('pregunta' + i);
      for (let j = 0; j < opciones.length; j++) {
          if (opciones[j].checked) {
              if (opciones[j].value == data[i].resposta_correcta) {
                  correctas++;
              }
          }
      }
  }

  // Mostrar el resultado
  
  document.getElementById("resultat").innerHTML="<p>Has encertat " + correctas + " de " + data.preguntes.length + " preguntes.</p>";
}
*/
