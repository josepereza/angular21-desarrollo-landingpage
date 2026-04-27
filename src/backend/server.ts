import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { getEnvironment } from './config/env';

const env = getEnvironment();
const app = express();
app.use(cors());
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

if (require.main === module) {
  const port = env.port;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Backend API server listening on http://localhost:${port}`);
  });
}

function getClientRouter(): Promise<express.Router> {
  if (!clientRouterPromise) {
    clientRouterPromise = Promise.all([
      import('./database/data-source'),
      import('./routes/client.routes'),
    ]).then(async ([databaseModule, routesModule]) => {
      const dataSource = await databaseModule.getAppDataSource();
      return routesModule.createClientRouter(dataSource);
    });
  }

  return clientRouterPromise;
}
