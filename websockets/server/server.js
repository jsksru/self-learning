const WebSocket = require('ws');
const { v4: uuid } = require('uuid');

const PORT = 3030;

const wss = new WebSocket.Server({ port: PORT }, () => console.log(`WebSocket server started on ${PORT} port...`));

const clients = [];

const broadcast = message => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

wss.on('connection', socket => {
  const clientId = uuid();
  socket.id = clientId;
  clients.push(clientId);

  broadcast(JSON.stringify({
    type: 'CONNECTED',
    user: clientId,
  }));

  socket.on('message', message => {
    broadcast(JSON.stringify({
      type: 'MESSAGE',
      text: message,
      from: clientId,
      time: Date.now(),
    }));
  });

  socket.on('close', () => {
    const result = clients.findIndex(i => i === socket.id);
    if (result !== -1) {
      broadcast(JSON.stringify({
        type: 'DISCONNECTED',
        user: clients[result],
      }));
      clients.splice(result, 1);
    }
  });
});