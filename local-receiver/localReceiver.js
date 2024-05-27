const WebSocket = require('ws');

// Configurações
const REMOTE_WEBSOCKET_URL = 'ws://your-ec2-domain:7788'; // Substitua pelo domínio real do seu EC2
const LOCAL_WEBSOCKET_PORT = 7788;

// Conectando ao WebSocket remoto (servidor EC2)
const remoteSocket = new WebSocket(REMOTE_WEBSOCKET_URL);

remoteSocket.on('open', () => {
    console.log('Conectado ao servidor WebSocket remoto.');
});

// Criando o WebSocket local
const localSocketServer = new WebSocket.Server({ port: LOCAL_WEBSOCKET_PORT });

localSocketServer.on('connection', (localSocket) => {
    console.log('Dispositivo local conectado.');

    // Encaminhar mensagens do dispositivo local para o servidor remoto
    localSocket.on('message', (message) => {
        if (remoteSocket.readyState === WebSocket.OPEN) {
            remoteSocket.send(message);
            console.log(`Mensagem enviada ao servidor remoto: ${message}`);
        } else {
            console.error('Conexão com o servidor remoto não está aberta.');
        }
    });

    // Encaminhar mensagens do servidor remoto para o dispositivo local
    remoteSocket.on('message', (message) => {
        if (localSocket.readyState === WebSocket.OPEN) {
            localSocket.send(message);
            console.log(`Mensagem enviada ao dispositivo local: ${message}`);
        } else {
            console.error('Conexão com o dispositivo local não está aberta.');
        }
    });

    localSocket.on('close', () => {
        console.log('Conexão com o dispositivo local fechada.');
    });

    localSocket.on('error', (error) => {
        console.error(`Erro no WebSocket local: ${error}`);
    });
});

remoteSocket.on('close', () => {
    console.log('Conexão com o servidor WebSocket remoto fechada.');
});

remoteSocket.on('error', (error) => {
    console.error(`Erro no WebSocket remoto: ${error}`);
});
