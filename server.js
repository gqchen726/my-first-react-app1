import express from 'express/lib/express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));
app.listen(8088);
