// Importación de módulos con desestructuración
const http = require('http');
const { URL } = require('url');
const fs = require('fs').promises;

// Constantes de configuración
const PORT = process.env.PORT || 3000;
const CONTENT_TYPE_HTML = { 'Content-Type': 'text/html' };
const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

// Datos para simulación de API
const usersData = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'María', email: 'maria@example.com' },
  { id: 3, name: 'Carlos', email: 'carlos@example.com' },
];

/**
 * Manejador de rutas con patrón async/await
 * @param {string} path - Ruta de la petición
 * @param {http.ServerResponse} response - Objeto de respuesta HTTP
 */
const handleRoutes = async (path, response) => {
  try {
    switch (path) {
      case '/':
      case '/home':
        response.writeHead(200, CONTENT_TYPE_HTML);
        response.end('<h1>Página de Inicio</h1><p>Bienvenido a nuestro servidor Node.js</p>');
        break;
      
      case '/about':
        response.writeHead(200, CONTENT_TYPE_HTML);
        response.end('<h1>Acerca de Nosotros</h1><p>Somos una empresa de desarrollo web</p>');
        break;
        
      case '/contact':
        response.writeHead(200, CONTENT_TYPE_HTML);
        response.end('<h1>Contacto</h1><p>Email: info@example.com</p>');
        break;
        
      case '/api/users':
        response.writeHead(200, CONTENT_TYPE_JSON);
        response.end(JSON.stringify(usersData));
        break;
        
      default:
        // Intenta cargar un archivo HTML dinámicamente
        try {
          const filePath = `./public${path}.html`;
          const content = await fs.readFile(filePath, 'utf8');
          response.writeHead(200, CONTENT_TYPE_HTML);
          response.end(content);
        } catch (error) {
          // Si el archivo no existe, muestra error 404
          response.writeHead(404, CONTENT_TYPE_HTML);
          response.end('<h1>404 - Página no encontrada</h1>');
        }
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    response.writeHead(500, CONTENT_TYPE_HTML);
    response.end('<h1>500 - Error interno del servidor</h1>');
  }
};

/**
 * Función principal que crea e inicia el servidor
 */
const startServer = () => {
  const server = http.createServer(async (req, res) => {
    // Obtener la URL y la ruta
    const baseURL = `http://${req.headers.host}/`;
    const parsedUrl = new URL(req.url, baseURL);
    const path = parsedUrl.pathname;
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${path}`);
    
    // Solo manejar peticiones GET
    if (req.method === 'GET') {
      await handleRoutes(path, res);
    } else {
      res.writeHead(405, CONTENT_TYPE_HTML);
      res.end('<h1>405 - Método no permitido</h1>');
    }
  });

  // Iniciar el servidor
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Presiona Ctrl+C para detener');
  });
  
  // Manejar errores del servidor
  server.on('error', (error) => {
    console.error('Error en el servidor:', error);
  });
};

// Iniciar el servidor
startServer();