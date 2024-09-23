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