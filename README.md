# 🔍 Google Translate URL Decoder - Bulk Tool

## 🌐 Project Description

This tool allows for simultaneous decoding of multiple URLs obfuscated by Google Translate. Particularly useful for security analysts, IT researchers, and professionals who need to examine URLs redirected through Google's translation service.

- [Google Translate Enhanced Bulk URL Decoder -Site-](https://0ctysa.github.io/decodedgoogletranslate/)

## 🛠️ Key Features

### 🔗 Bulk URL Decoding

- Batch processing of multiple obfuscated URLs
- Support for different Google Translate encoding schemes
- IDN (Internationalized Domain Names) character handling

### ⚙️ Additional Features

- **Parameter cleaning**: Removes Google tracking parameters (`_x_tr_sl`, `_x_tr_tl`, etc.)
- **Easy copying**: Button to copy all results to clipboard
- **Smart validation**: Automatically detects valid Google Translate URLs
- **Test cases**: Preloaded test cases for quick testing
- **Original URL display**: Option to view the original URLs before decoding
- **Enhanced decoding**: Handles both `translate.goog` and `translate.google.com` patterns, including obfuscated URLs.

## 🖥️ How to Use the Tool

1. **Paste URLs**: Enter encoded URLs (one per line) in the text area.

   ```
   Example:
   https://example-com.translate.goog
   https://foo-example-com.translate.goog
   https://translate.google.com/translate?u=https%3A%2F%2Freal-site.com
   ```

2. **Available options**:
   - **Decode URLs**: Processes URLs and displays results.
   - **Clean**: Clears the text area.
   - **Remove Google Parameters**: Eliminates tracking parameters from decoded URLs.
   - **Show Original**: Displays the original URLs before decoding.
   - **Copy Results**: Copies decoded URLs to the clipboard.
   - **Load Test Cases**: Loads predefined test cases for quick testing.

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

1. `decodeHostname()`: Decodes obfuscated hostnames.
2. `decodeFullURLs()`: Processes multiple URLs and displays results.
3. `removeGoogleParameters()`: Cleans tracking parameters.
4. `copyResults()`: Copies results to clipboard.
5. `showOriginalURLs()`: Displays the original URLs before decoding.
6. `loadTestCases()`: Loads predefined test cases for testing.
7. Form validation event handlers.

## 🚀 Use Cases

1. **Security research**: Analyzing suspicious obfuscated URLs.
2. **Digital forensics**: Reconstructing original URLs.
3. **Web monitoring**: Identifying actual redirection destinations.

## 📌 Requirements

- Modern browser (Chrome, Firefox, Edge)
- Internet connection (to load Bootstrap)
- No installation required (pure web tool)

## ⚠️ Considerations

- **Supported URL patterns**: The tool supports decoding for both `translate.goog` and `translate.google.com` URLs. Ensure the URLs follow these patterns for accurate decoding.
- **Parameter removal**: The "Remove Google Parameters" feature eliminates specific tracking parameters but may not handle custom or unknown parameters.
- **Validation**: URLs must be in a valid format. Invalid or unsupported URLs will be flagged with a warning or error badge.
- **IDN handling**: The tool supports Internationalized Domain Names (IDN) but requires proper encoding in the input URLs.
- **Limitations**: The tool does not handle all possible obfuscation schemes and is limited to Google Translate URLs.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
