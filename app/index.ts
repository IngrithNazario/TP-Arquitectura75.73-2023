import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routers';

// Antes de ejecutar algun script se necesitan las dependencias
// Ejecutar npm install

/**
 * scripts disponibles para el servidor:
 *  - npm run build (compila de ts a js en la carpeta ./build)
 *  - npm run start (ejecuta el index.js de la carpeta ./build si existe)
 *  - npm run clean (remueve la carpeta de buildeo ./build)
 *  - npm run build_start (compila y ejecuta el servidor)
 *  - npm run dev "dev" (levanta el servidor en desarrollo para escuchar cambios)
 */

const PORT = 3000;

const app = express();
app.use(express.static("client")); // TODO: Eliminar, no creo que haga falta si no existe un directorio client con archivos que el servidor deba entregar.
app.use(bodyParser.urlencoded({extended: false})); // TODO: Eliminar, no creo que haga falta, todos son verbos GET, no hay cuerpos en las peticiones.
app.use('', router);
app.listen(PORT, () => { console.log(`Server running at :${PORT}`)});
