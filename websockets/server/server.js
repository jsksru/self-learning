const WebSocket = require('ws');
const http = require('http');
const { v4: uuid } = require('uuid');

const PORT = 3030;
const server = http.createServer();
const wss = new WebSocket.Server({noServer: true});

const clients = [];

const broadcast = (message) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(message);
  });
};

wss.on('connection', (socket, req) => {
  const clientId = uuid();
  socket.id = clientId;

  clients.push({
    id: clientId,
    userAgent: req.headers['user-agent'],
    ip: req.connection.remoteAddress,
    name: null,
  });

  broadcast(JSON.stringify({
    type: 'CONNECTED',
    user: clientId,
  }));

  socket.on('message', (message) => {
    switch (message) {
      case '/clients':
        broadcast(JSON.stringify({ type: 'CLIENTS', clients }));
        break;
      default:
        broadcast(JSON.stringify({ type: 'MESSAGE', text: message, from: clientId, time: Date.now() }));
    }
  });

  socket.on('close', () => {
    const result = clients.findIndex(i => i.id === socket.id);
    if (result !== -1) {
      broadcast(JSON.stringify({
        type: 'DISCONNECTED',
        user: clients[result].id,
      }));
      clients.splice(result, 1);
    }
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(PORT, '0.0.0.0', () => console.log(`WebSocket server started on ${PORT} port...`));