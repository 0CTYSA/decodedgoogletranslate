function decodeHostname(proxyUrl) {
  const parsedProxyUrl = new URL(proxyUrl);
  let domainPrefix = parsedProxyUrl.hostname.substring(
    0,
    parsedProxyUrl.hostname.indexOf(".translate.goog")
  );
  const encodingList = parsedProxyUrl.searchParams.has("_x_tr_enc")
    ? parsedProxyUrl.searchParams.get("_x_tr_enc").split(",")
    : [];
  if (parsedProxyUrl.searchParams.has("_x_tr_hp")) {
    domainPrefix = parsedProxyUrl.searchParams.get("_x_tr_hp") + domainPrefix;
  }
  let isIdn = false;
  if (encodingList.includes("1") && domainPrefix.startsWith("1-")) {
    domainPrefix = domainPrefix.substring(2);
  }
  if (encodingList.includes("0") && domainPrefix.startsWith("0-")) {
    isIdn = true;
    domainPrefix = domainPrefix.substring(2);
  }
  let decodedSegment = domainPrefix
    .replaceAll(/\b-\b/g, ".")
    .replaceAll("--", "-");
  if (isIdn) {
    decodedSegment = "xn--" + decodedSegment;
  }
  return decodedSegment;
}

function decodeFullURLs(validUrls) {
  // Ya no necesitamos obtener las URLs del campo de entrada porque estamos pasando las URLs válidas como un parámetro.
  var listElement = document.getElementById("decodedURLsList");
  listElement.innerHTML = ""; // Limpiar la lista anterior.

  validUrls.forEach(function (proxyUrl) {
    // Usa el array validUrls ya validado.
    var parsedUrl = new URL(proxyUrl);
    var decodedHostname = decodeHostname(proxyUrl);
    parsedUrl.hostname = decodedHostname;
    parsedUrl.pathname = parsedUrl.pathname;
    parsedUrl.searchParams.delete("_x_tr_enc");
    parsedUrl.searchParams.delete("_x_tr_hp");

    // Agregar el resultado a la lista
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = parsedUrl.href;
    listElement.appendChild(listItem);
  });
}

function removeGoogleParameters() {
  var listItems = document
    .getElementById("decodedURLsList")
    .getElementsByTagName("li");
  for (var i = 0; i < listItems.length; i++) {
    var url = new URL(listItems[i].textContent);
    url.searchParams.delete("_x_tr_sl");
    url.searchParams.delete("_x_tr_tl");
    url.searchParams.delete("_x_tr_hl");
    url.searchParams.delete("_x_tr_pto");
    listItems[i].textContent = url.href;
  }
}

function copyResults() {
  var listItems = document
    .getElementById("decodedURLsList")
    .getElementsByTagName("li");
  var allText = "";
  for (var i = 0; i < listItems.length; i++) {
    allText += listItems[i].textContent + "\n";
  }

  navigator.clipboard.writeText(allText).then(
    function () {
      alert("Resultados copiados al portapapeles.");
    },
    function (err) {
      console.error("Error al copiar al portapapeles: ", err);
    }
  );
}

function clearTextArea() {
  document.getElementById("urlInput").value = ""; // Limpia el contenido del textarea
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("urlForm");
  var urlInput = document.getElementById("urlInput");

  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      // Quitar clases previas para resetear la validación visual
      urlInput.classList.remove("is-invalid", "is-valid");

      var urls = urlInput.value.trim().split("\n").filter(Boolean); // Elimina líneas vacías
      var isValid = urls.length > 0; // Al menos debe haber una URL
      var googleTranslateRegex = /^(https?:\/\/)?([\w\-]+\.)+translate\.goog/;

      // Revisa cada URL para ver si corresponde a un dominio de Google Translate
      urls.forEach(function (url) {
        if (!googleTranslateRegex.test(url.trim())) {
          isValid = false;
        }
      });

      // Aplicar clases de validación según si la entrada es válida o no
      if (!isValid) {
        // Si es inválido, añadir 'is-invalid' y quitar 'is-valid'
        urlInput.classList.remove("is-valid");
        urlInput.classList.add("is-invalid");
        form.classList.add("was-validated");
      } else {
        // Si es válido, añadir 'is-valid' y quitar 'is-invalid'
        urlInput.classList.remove("is-invalid");
        urlInput.classList.add("is-valid");
        // Si todo es válido, proceder con la función de decodificación
        decodeFullURLs(urls); // Asegúrate de que esta función esté definida y haga lo que necesitas
      }
    },
    false
  );
});
