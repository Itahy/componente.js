// Objeto donde se almacenan los códigos generados por cada componente
const captchas = new WeakMap();

// Función para crear un nuevo código en un componente dado
function generarCaptcha(cuadro) {
  const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //variable en donde se guardan las letras y numeros que se oueden usar para ir generando los codigos
  let codigo = ""; //se limpia la variable 
  //se hace uso de un for para generar un codigo con 5 caracteres
  for (let i = 0; i < 5; i++) {
    codigo += letras.charAt(Math.floor(Math.random() * letras.length)); //se genera un codigo de manera aleatorio con 5 caracteres y se guarda en la variable codigo
  }

  //se guarda el codigo asociado al cuadro
  captchas.set(cuadro, codigo);
  
  const canvas = cuadro.querySelector(".captcha-canvas"); //se obtiene el canvas dentro de este cuadro
  const ctx = canvas.getContext("2d"); //dibujar sobre el canva
  ctx.clearRect(0, 0, canvas.width, canvas.height); //se borra todo lo que haya en el canvas por si ya habia un codigo anterior y no se sobreescriba
  ctx.font = "28px Arial"; //se establece tipo de letra
  ctx.fillStyle = "#000"; //se establece el color de la letra
  ctx.fillText(codigo, 20, 35); //se escribe el codigo que se genero anteriormente y esta guardado en la variable codigo dentro del canva y se le da las posiciones de los ejes X y Y

  cuadro.querySelector(".captcha-respuesta").value = ""; //se limpia el area en donde se ingresa el codigo

  const mensaje = cuadro.querySelector(".captcha-mensaje"); //se obtiene el elemento en donde se muestra el mensaje
  mensaje.textContent = ""; //se borra el texto del mensaje
  mensaje.className = "captcha-mensaje mt-3 text-center"; //se reestablecen las clases por defecto
}

//Funcion para verificar el codigo
function verificarCaptcha(cuadro) {
  const respuesta = cuadro.querySelector(".captcha-respuesta").value.trim(); //se obtiene el codigo que el usuario escribio
  const mensaje = cuadro.querySelector(".captcha-mensaje"); //se obtiene el elemento donde se pondra el mensaje 
  const codigo = captchas.get(cuadro); //Recupera el código que fue generado anteriormente para este cuadro específico

  //Validacion de que el campo no este vacio
  //Si el texto es vacio
  if (respuesta === "") {
    mensaje.textContent = "Debes escribir el código"; //se muestra un mensaje de advertencia
    mensaje.className = "captcha-mensaje mt-3 text-center text-warning"; //estilo de mensaje en color amarillo
  } 
  //Comparacion
  //Si el texto que ingreso el usuario es igual al codigp que se genero
  else if (respuesta === codigo) {
    mensaje.textContent = "Código correcto"; //se muestra un mensaje de exito
    mensaje.className = "captcha-mensaje mt-3 text-center text-success"; //estilo de mensaje en verde
  } 
  //si no es igual
  else {
    mensaje.textContent = "Código incorrecto. Intenta otra vez"; //se muestra un mensaje de error
    mensaje.className = "captcha-mensaje mt-3 text-center text-danger"; //estilo de mensaje en rojo
  }
}

//evento que permite ejecutar cuando todo el HTML ha sido cargado completamente
window.addEventListener("DOMContentLoaded", () => {
  const cuadros = document.querySelectorAll(".captcha-cuadro"); //se seleccionan todos los elementos que tienen la clase "captcha-cuadro"

  //se recorre cada uno de los cuadros captcha encontrados
  cuadros.forEach(cuadro => {
    generarCaptcha(cuadro); //se genera el primer código captcha al cargar

    cuadro.querySelector(".captcha-nuevo").addEventListener("click", () => generarCaptcha(cuadro)); //se agrega el evento de clic al botón "Otro código" 

    cuadro.querySelector(".captcha-verificar").addEventListener("click", () => verificarCaptcha(cuadro)); //se agrega el evento de clic al botón "Comprobar" 
  });
});


