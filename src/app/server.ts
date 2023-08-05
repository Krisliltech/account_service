import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import methodOverride from 'method-override';
import { env } from './config/env';
import container from './config/inversify-config';

const app = express();
const server = new InversifyExpressServer(container, null, null, app);

server.setConfig((app) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.text({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(methodOverride());
  app.disable('x-powered-by');
});

const serverInstance = server.build();
const PORT = env.port;

serverInstance.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send({
    message: `Route '${req.path}', NOT found...`,
    status: 'error'
  });
});


serverInstance.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

export default app;