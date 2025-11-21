import 'dotenv/config';
import express, { type Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { registerRoutes } from './routes';
import { setupVite, serveStatic, log } from './vite';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sanitization helper: strips newlines from a string
function sanitizeForLog(input: string): string {
  return input.replace(/[\n\r]/g, '');
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = sanitizeForLog(req.path);
  let capturedJsonResponse: Record<string, unknown> | undefined = undefined;

  const originalResJson = res.json;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.json = function (bodyJson: any) {
    capturedJsonResponse = bodyJson;
    return originalResJson.call(res, bodyJson);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + '…';
      }

      log(logLine);
    }
  });

  next();
});

const configuredApp = registerRoutes(app);

configuredApp.use(
  /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message });
  }
  /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
);

// importantly only setup vite in development and after
// setting up all the other routes so the catch-all route
// doesn't interfere with the other routes
if (configuredApp.get('env') === 'development') {
  const server = createServer(configuredApp);
  setupVite(configuredApp, server);
  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 3000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen(
    {
      port,
      host: '0.0.0.0',
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
} else {
  serveStatic(configuredApp);
  if (!process.env.VERCEL) {
    const server = createServer(configuredApp);
    const port = parseInt(process.env.PORT || '3000', 10);
    server.listen(
      {
        port,
        host: '0.0.0.0',
      },
      () => {
        log(`serving on port ${port}`);
      }
    );
  }
}

export default configuredApp;
