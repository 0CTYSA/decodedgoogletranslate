# 🔍 Google Translate URL Decoder - Bulk Tool

## 🌐 Project Description

This tool allows for simultaneous decoding of multiple URLs obfuscated by Google Translate. Particularly useful for security analysts, IT researchers, and professionals who need to examine URLs redirected through Google's translation service.

## 🛠️ Key Features

### 🔗 Bulk URL Decoding

- Batch processing of multiple obfuscated URLs
- Support for different Google Translate encoding schemes
- IDN (Internationalized Domain Names) character handling

### ⚙️ Additional Features

- **Parameter cleaning**: Removes Google tracking parameters (`_x_tr_sl`, `_x_tr_tl`, etc.)
- **Easy copying**: Button to copy all results to clipboard
- **Smart validation**: Automatically detects valid Google Translate URLs

## 🖥️ How to Use the Tool

1. **Paste URLs**: Enter encoded URLs (one per line) in the text area

   ```
   Example:
   https://example-com.translate.goog
   https://foo-example-com.translate.goog
   ```

2. **Available options**:
   - **Decode URLs**: Processes URLs and displays results
   - **Clean**: Clears the text area
   - **Remove Google Parameters**: Eliminates tracking parameters
   - **Copy Results**: Copies decoded URLs

## ⚙️ Technologies Used

- **Frontend**: HTML5, Bootstrap 4
- **JavaScript**: Client-side validation, URL manipulation
- **Web API**: Clipboard API for copying to clipboard

## 📁 Code Structure

### Main files:

- `index.html`: User interface
- `decoder.js`: Core decoding logic
- `styles.css`: Custom styles

### Key functions in decoder.js:

1. `decodeHostname()`: Decodes obfuscated hostnames
2. `decodeFullURLs()`: Processes multiple URLs and displays results
3. `removeGoogleParameters()`: Cleans tracking parameters
4. `copyResults()`: Copies results to clipboard
5. Form validation event handlers

## 🚀 Use Cases

1. **Security research**: Analyzing suspicious obfuscated URLs
2. **Digital forensics**: Reconstructing original URLs
3. **Web monitoring**: Identifying actual redirection destinations

## 📌 Requirements

- Modern browser (Chrome, Firefox, Edge)
- Internet connection (to load Bootstrap)
- No installation required (pure web tool)

## ⚠️ Limitations

- Only works with Google Translate URLs
- Doesn't handle all possible obfuscation schemes
- Requires URLs to have valid format

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
