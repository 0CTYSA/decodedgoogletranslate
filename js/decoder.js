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
  // We no longer need to get the URLs from the input field because we are passing the valid URLs as a parameter.
  var listElement = document.getElementById("decodedURLsList");
  listElement.innerHTML = ""; // Clear the previous list.

  validUrls.forEach(function (proxyUrl) {
    // Uses the already validated validUrls array.
    var parsedUrl = new URL(proxyUrl);
    var decodedHostname = decodeHostname(proxyUrl);
    parsedUrl.hostname = decodedHostname;
    parsedUrl.pathname = parsedUrl.pathname;
    parsedUrl.searchParams.delete("_x_tr_enc");
    parsedUrl.searchParams.delete("_x_tr_hp");

    // Add the result to the list
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
  document.getElementById("urlInput").value = ""; // Clears the textarea content
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("urlForm");
  var urlInput = document.getElementById("urlInput");

  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      // Remove previous classes to reset visual validation
      urlInput.classList.remove("is-invalid", "is-valid");

      var urls = urlInput.value.trim().split("\n").filter(Boolean); // Removes empty lines
      var isValid = urls.length > 0; // There must be at least one URL
      var googleTranslateRegex = /^(https?:\/\/)?([\w\-]+\.)+translate\.goog/;

      // Check each URL to see if it corresponds to a Google Translate domain.
      urls.forEach(function (url) {
        if (!googleTranslateRegex.test(url.trim())) {
          isValid = false;
        }
      });

      // Apply validation classes depending on whether the input is valid or invalid
      if (!isValid) {
        // If invalid, add 'is-invalid' and remove 'is-valid'.
        urlInput.classList.remove("is-valid");
        urlInput.classList.add("is-invalid");
        form.classList.add("was-validated");
      } else {
        // If valid, add 'is-valid' and remove 'is-invalid'.
        urlInput.classList.remove("is-invalid");
        urlInput.classList.add("is-valid");
        // If everything is valid, proceed with the decoding function.
        decodeFullURLs(urls); // Make sure this function is defined and does what you need it to do.
      }
    },
    false
  );
});
