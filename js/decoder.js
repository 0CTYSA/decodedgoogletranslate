const urlRegistry = [];

function decodeHostname(proxyUrl) {
  try {
    const parsedUrl = new URL(proxyUrl);

    // Caso 1: URLs de translate.google.com
    if (
      parsedUrl.hostname === "translate.google.com" ||
      parsedUrl.hostname === "translate.google.es"
    ) {
      const originalUrl = parsedUrl.searchParams.get("u");
      if (originalUrl) {
        return {
          original: proxyUrl,
          decoded: decodeURIComponent(originalUrl),
          type: "google_translate",
        };
      }
    }

    // Caso 2: URLs de translate.goog
    if (parsedUrl.hostname.endsWith(".translate.goog")) {
      let domainPrefix = parsedUrl.hostname.replace(".translate.goog", "");

      // Paso 2: Lista de codificaciones
      const encodingList = parsedUrl.searchParams.has("_x_tr_enc")
        ? parsedUrl.searchParams.get("_x_tr_enc").split(",")
        : [];

      // Paso 3: Agregar _x_tr_hp al dominio si existe
      if (parsedUrl.searchParams.has("_x_tr_hp")) {
        domainPrefix = parsedUrl.searchParams.get("_x_tr_hp") + domainPrefix;
      }

      // Paso 4: Eliminar "1-" si encoding incluye "1"
      if (encodingList.includes("1") && domainPrefix.startsWith("1-")) {
        domainPrefix = domainPrefix.substring(2);
      }

      // Paso 5: Eliminar "0-" si encoding incluye "0"
      let isIdn = false;
      if (encodingList.includes("0") && domainPrefix.startsWith("0-")) {
        isIdn = true;
        domainPrefix = domainPrefix.substring(2);
      }

      // Paso 6 & 7: Reemplazos de "-" por "." y "--" por "-"
      let decodedSegment = domainPrefix
        .replace(/\b-\b/g, ".")
        .replace(/--/g, "-");

      // Paso 8: Añadir "xn--" si es IDN
      if (isIdn) {
        decodedSegment = "xn--" + decodedSegment;
      }

      // Reconstruir URL final
      const decodedUrl = new URL(parsedUrl.toString());
      decodedUrl.hostname = decodedSegment;

      // Eliminar todos los parámetros _x_tr_*
      [...decodedUrl.searchParams.keys()]
        .filter((key) => key.startsWith("_x_tr_"))
        .forEach((key) => decodedUrl.searchParams.delete(key));

      return {
        original: proxyUrl,
        decoded: decodedUrl.toString(),
        type: "translate_goog",
      };
    }

    // Caso desconocido
    return {
      original: proxyUrl,
      decoded: proxyUrl,
      type: "unknown",
    };
  } catch (e) {
    return {
      original: proxyUrl,
      decoded: proxyUrl,
      type: "error",
    };
  }
}

function decodeFullURLs(validUrls) {
  const listElement = document.getElementById("decodedURLsList");
  const resultCountElement = document.getElementById("resultCount");

  listElement.innerHTML = "";
  urlRegistry.length = 0; // Limpiar el registro

  validUrls.forEach((proxyUrl) => {
    const result = decodeHostname(proxyUrl);
    urlRegistry.push(result); // Guardar en el registro

    const listItem = document.createElement("li");
    listItem.className = "list-group-item";

    const urlSpan = document.createElement("span");
    urlSpan.textContent = result.decoded;

    const badge = document.createElement("span");
    badge.className = `badge ${
      result.type === "error"
        ? "badge-danger"
        : result.type === "unknown"
        ? "badge-warning"
        : "badge-info"
    } url-badge`;
    badge.textContent = result.type;

    listItem.appendChild(urlSpan);
    listItem.appendChild(badge);
    listElement.appendChild(listItem);
  });

  // Actualizar el contador
  resultCountElement.textContent = urlRegistry.length.toString();
  document.getElementById("removeParamsBtn").style.display = "none";
}

function showOriginalURLs() {
  const listElement = document.getElementById("decodedURLsList");
  const resultCountElement = document.getElementById("resultCount");
  listElement.innerHTML = "";

  urlRegistry.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";

    const urlSpan = document.createElement("span");
    urlSpan.textContent = item.original;

    const badge = document.createElement("span");
    badge.className = "badge badge-secondary url-badge";
    badge.textContent = "original";

    listItem.appendChild(urlSpan);
    listItem.appendChild(badge);
    listElement.appendChild(listItem);
  });

  // Mostrar botón de limpiar parámetros
  document.getElementById("removeParamsBtn").style.display = "inline-block";

  // Actualizar contador
  resultCountElement.textContent = urlRegistry.length.toString();
}

function loadTestCases() {
  const testCases = [
    "https://example-com.translate.goog/path?_x_tr_sl=auto",
    "https://translate.google.com/translate?u=https%3A%2F%2Freal-site.com%2Ftest",
    "https://random123-bank-com.translate.goog/login",
  ];

  document.getElementById("urlInput").value = testCases.join("\n");
}

function removeGoogleParameters() {
  const listElement = document.getElementById("decodedURLsList");
  const resultCountElement = document.getElementById("resultCount");
  listElement.innerHTML = "";

  urlRegistry.forEach((item) => {
    try {
      // Reaplicar el decodificador sobre la URL original
      const reDecoded = decodeHostname(item.original);
      const urlObj = new URL(reDecoded.decoded);

      // Limpiar parámetros específicos de Google Translate
      [
        "_x_tr_sl",
        "_x_tr_tl",
        "_x_tr_hl",
        "_x_tr_pto",
        "_x_tr_hp",
        "_x_tr_enc",
      ].forEach((param) => {
        urlObj.searchParams.delete(param);
      });

      const listItem = document.createElement("li");
      listItem.className = "list-group-item";

      const urlSpan = document.createElement("span");
      urlSpan.textContent = urlObj.toString();

      const badge = document.createElement("span");
      badge.className = `badge ${
        reDecoded.type === "error"
          ? "badge-danger"
          : reDecoded.type === "unknown"
          ? "badge-warning"
          : "badge-info"
      } url-badge`;
      badge.textContent = reDecoded.type;

      listItem.appendChild(urlSpan);
      listItem.appendChild(badge);
      listElement.appendChild(listItem);
    } catch (e) {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";

      const urlSpan = document.createElement("span");
      urlSpan.textContent = item.original;

      const badge = document.createElement("span");
      badge.className = `badge badge-danger url-badge`;
      badge.textContent = "error";

      listItem.appendChild(urlSpan);
      listItem.appendChild(badge);
      listElement.appendChild(listItem);
    }
  });

  // Actualizar contador
  resultCountElement.textContent = urlRegistry.length.toString();
}

function copyResults() {
  const listItems = document
    .getElementById("decodedURLsList")
    .getElementsByTagName("li");
  let allText = "";

  for (let i = 0; i < listItems.length; i++) {
    const urlSpan = listItems[i].querySelector("span");
    if (urlSpan) {
      allText += urlSpan.textContent.trim() + "\n";
    }
  }

  navigator.clipboard.writeText(allText).then(
    () => {
      alert("Resultados copiados al portapapeles.");
    },
    (err) => {
      console.error("Error al copiar al portapapeles: ", err);
    }
  );
}

function clearTextArea() {
  document.getElementById("urlInput").value = "";

  const listElement = document.getElementById("decodedURLsList");
  listElement.innerHTML = "";

  document.getElementById("resultCount").textContent = "0";

  document
    .getElementById("urlInput")
    .classList.remove("is-invalid", "is-valid");
  document.getElementById("urlForm").classList.remove("was-validated");
  document.getElementById("removeParamsBtn").style.display = "none";

  urlRegistry.length = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("urlForm");
  const urlInput = document.getElementById("urlInput");

  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      // Reset validation classes
      urlInput.classList.remove("is-invalid", "is-valid");
      form.classList.remove("was-validated");

      const urls = urlInput.value.trim().split("\n").filter(Boolean);
      const googleTranslateRegex =
        /^(https?:\/\/)?([\w\-]+\.)*(translate\.goog|translate\.google\.[a-z]+)/i;

      // Validate each URL
      let isValid = urls.length > 0;
      urls.forEach((url) => {
        if (!googleTranslateRegex.test(url.trim())) {
          isValid = false;
        }
      });

      // Apply validation
      if (!isValid) {
        urlInput.classList.add("is-invalid");
        form.classList.add("was-validated");
      } else {
        urlInput.classList.add("is-valid");
        decodeFullURLs(urls);
      }
    },
    false
  );
});
