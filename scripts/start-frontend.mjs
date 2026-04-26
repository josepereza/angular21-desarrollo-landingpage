import http from 'node:http';
import { reqHandler } from '../dist/angular21-desarrollo-landingpage/server/server.mjs';

const port = Number(process.env.PORT ?? 4000);

const server = http.createServer((req, res) => {
  void reqHandler(req, res, (error) => {
    if (error) {
      console.error('Frontend server error:', error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain; charset=utf-8');
      }
      if (!res.writableEnded) {
        res.end('Internal server error.');
      }
      return;
    }

    if (!res.writableEnded) {
      res.statusCode = 404;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end('Not found.');
    }
  });
});

server.listen(port, () => {
  console.log(`Frontend server listening on http://localhost:${port}`);
});
