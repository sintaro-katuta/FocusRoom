const WebSocketServer = require('ws').Server;
const port = 3010
const server = new WebSocketServer({ port })

server.on('connection', (me) => {
    me.on('message', (msg) => {
        server.clients.forEach((client) => {
            if (me === client) {
                console.log('skip')
            } else {
                client.send(msg)
            }
        })
    })
})