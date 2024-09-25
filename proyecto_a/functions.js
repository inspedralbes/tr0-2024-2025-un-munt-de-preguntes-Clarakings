let data;
let estadoDeLaPartida = {
    contadorPreguntes: 0,
    preguntes: []
};

fetch('http://localhost/proyecto_a/backend/carregar_preguntes.php')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      mostrarTest(data)
      //verificarRespuestas(data)
    });


// Función para mostrar las preguntas del test
function mostrarTest(info) {
  data = info;
  htmlString='';
  htmlString+="<h2>Test de Autoescuela</h2>";
  
  for (let i = 0; i < data.length; i++) {
      // Mostrar la pregunta
      htmlString+="<p>" + data[i].pregunta + "</p>";
      
      // Mostrar la imagen si existe
      if (data[i].imatge) {
          htmlString+="<img src='imagenes/" + data[i].imatge + "' width='200'><br>";
      }

      // Mostrar las respuestas 
      htmlString += "<div id='pregunta" + i + "'>";
      for (let j = 0; j < data[i].respuestas.length; j++) {
          htmlString += "<button onclick='marcarRespuesta(\"" + i + "\", \"" + data[i].respuestas[j] + "\")'>" + data[i].respuestas[j] + "</button><br>";
      }
      htmlString += "</div><br>";
  }

  // Botón para verificar las respuestas
  /*htmlString+="<button onclick='verificarRespuestas()'>Comprovar respostes</button>";*/
  
  document.getElementById("test-container").innerHTML=htmlString;
  actualizarEstado();
}
