const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT || '3000');
const host = '0.0.0.0';

const app = next({
    dev: process.env.NODE_ENV !== 'production',
});
const handle = app.getRequestHandler();

(async () => {
    await app.prepare();
    const server = express();
    server.get('*', (req, res) => handle(req, res));
    server.listen(port, host);
    console.log(`> Ready on http://localhost:${port}`);
})();