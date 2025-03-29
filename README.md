# 🔍 Google Translate URL Decoder - Bulk Tool

## 🌐 Descripción del Proyecto

Esta herramienta permite decodificar múltiples URLs ofuscadas por Google Translate simultáneamente. Especialmente útil para analistas de seguridad, investigadores de TI y profesionales que necesitan examinar URLs redirigidas a través del servicio de traducción de Google.

## 🛠️ Funcionalidades Principales

### 🔗 Decodificación Masiva de URLs

- Procesamiento por lotes de múltiples URLs ofuscadas
- Soporte para diferentes esquemas de codificación de Google Translate
- Manejo de caracteres IDN (Nombres de Dominio Internacionalizados)

### ⚙️ Características Adicionales

- **Limpieza de parámetros**: Elimina parámetros de tracking de Google (`_x_tr_sl`, `_x_tr_tl`, etc.)
- **Copiado fácil**: Botón para copiar todos los resultados al portapapeles
- **Validación inteligente**: Detecta automáticamente URLs válidas de Google Translate

## 🖥️ Cómo Usar la Herramienta

1. **Pegar URLs**: Ingresa las URLs codificadas (una por línea) en el área de texto

   ```
   Ejemplo:
   https://example-com.translate.goog
   https://foo-example-com.translate.goog
   ```

2. **Opciones disponibles**:
   - **Decode URLs**: Procesa las URLs y muestra los resultados
   - **Clean**: Limpia el área de texto
   - **Remove Google Parameters**: Elimina parámetros de tracking
   - **Copy Results**: Copia los URLs decodificados

## ⚙️ Tecnologías Utilizadas

- **Frontend**: HTML5, Bootstrap 4
- **JavaScript**: Validación en cliente, manipulación de URLs
- **API Web**: Clipboard API para copiado al portapeles

## 📁 Estructura del Código

### Archivos principales:

- `index.html`: Interfaz de usuario
- `decoder.js`: Lógica principal de decodificación
- `styles.css`: Estilos personalizados

### Funciones clave en decoder.js:

1. `decodeHostname()`: Decodifica el nombre de host ofuscado
2. `decodeFullURLs()`: Procesa múltiples URLs y muestra resultados
3. `removeGoogleParameters()`: Limpia parámetros de tracking
4. `copyResults()`: Copia resultados al portapeles
5. Manejadores de eventos para validación de formulario

## 🚀 Casos de Uso

1. **Investigación de seguridad**: Analizar URLs sospechosas ofuscadas
2. **Análisis forense digital**: Reconstruir URLs originales
3. **Monitoreo web**: Identificar destinos reales de redirecciones

## 📌 Requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- Conexión a Internet (para cargar Bootstrap)
- No se requiere instalación (herramienta web pura)

## ⚠️ Limitaciones

- Solo funciona con URLs de Google Translate
- No maneja todos los posibles esquemas de ofuscación
- Requiere que las URLs tengan formato válido

## 📜 Licencia

Distribuido bajo licencia MIT. Ver `LICENSE` para más información.
