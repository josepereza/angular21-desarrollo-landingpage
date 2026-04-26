import 'reflect-metadata';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getEnvironment } from './backend/config/env';

const env = getEnvironment();
const browserDistFolder = join(dirname(fileURLToPath(import.meta.url)), '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', proxyApiRequests);

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
 * Exporta el manejador usado por Angular CLI y despliegues serverless compatibles.
 */
export const reqHandler = createNodeRequestHandler(app);

async function proxyApiRequests(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> {
  if (!req.originalUrl.startsWith('/api/')) {
    return next();
  }

  try {
    const targetUrl = new URL(req.originalUrl, env.backendBaseUrl);
    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      const normalizedKey = key.toLowerCase();
      if (
        normalizedKey === 'host' ||
        normalizedKey === 'connection' ||
        normalizedKey === 'content-length'
      ) {
        continue;
      }

      if (typeof value === 'string') {
        headers.set(key, value);
        continue;
      }

      if (Array.isArray(value)) {
        for (const entry of value) {
          headers.append(key, entry);
        }
      }
    }

    const hasBody = !['GET', 'HEAD'].includes(req.method);
    const requestInit: RequestInit = {
      method: req.method,
      headers,
    };

    if (hasBody) {
      requestInit.body = serializeRequestBody(req);
    }

    const response = await fetch(targetUrl, requestInit);
    res.status(response.status);

    response.headers.forEach((value, key) => {
      if (key === 'transfer-encoding' || key === 'content-length') {
        return;
      }

      res.setHeader(key, value);
    });

    if (!response.body) {
      res.end();
      return;
    }

    const body = Buffer.from(await response.arrayBuffer());
    res.send(body);
  } catch (error) {
    next(error);
  }
}

function serializeRequestBody(req: express.Request): BodyInit | undefined {
  if (req.body == null) {
    return undefined;
  }

  if (Buffer.isBuffer(req.body)) {
    return new Uint8Array(req.body);
  }

  if (typeof req.body === 'string') {
    return req.body;
  }

  if (req.is('application/x-www-form-urlencoded')) {
    return new URLSearchParams(req.body as Record<string, string>).toString();
  }

  return JSON.stringify(req.body);
}
