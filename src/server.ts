import 'reflect-metadata';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { getEnvironment } from './backend/config/env';

const browserDistFolder = join(import.meta.dirname, '../browser');
const env = getEnvironment();

const app = express();
const angularApp = new AngularNodeAppEngine();
let clientRouterPromise: Promise<express.Router> | null = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', async (req, res, next) => {
  try {
    const clientRouter = await getClientRouter();
    return clientRouter(req, res, next);
  } catch (error) {
    console.error('No se pudo inicializar la API:', error);
    return res.status(500).json({
      success: false,
      message: 'Die Datenbankverbindung ist momentan nicht verfügbar.',
    });
  }
});

/**
 * Sirve los archivos estáticos generados para el navegador.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Resuelve el resto de peticiones renderizando la aplicación Angular.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Inicia el servidor cuando este módulo se ejecuta como entrada principal.
 */
if (isMainModule(import.meta.url)) {
  const port = env.port;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Exporta el manejador usado por Angular CLI y despliegues serverless compatibles.
 */
export const reqHandler = createNodeRequestHandler(app);

function getClientRouter(): Promise<express.Router> {
  if (!clientRouterPromise) {
    clientRouterPromise = Promise.all([
      import('./backend/database/data-source'),
      import('./backend/routes/client.routes'),
    ]).then(async ([databaseModule, routesModule]) => {
      const dataSource = await databaseModule.getAppDataSource();
      return routesModule.createClientRouter(dataSource);
    });
  }

  return clientRouterPromise;
}
