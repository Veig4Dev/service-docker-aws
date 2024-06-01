const WebSocket = require('ws');

const PORT = 7788;
const server = new WebSocket.Server({ port: PORT });

// Inicializando servidor WebSocket
server.on('listening', () => {
    console.log(`Servidor WebSocket iniciado na porta ${PORT}.`);
});

server.on('connection', connectionSucess);

function sendJson(ws) {
    try {
        const data = {
            cmd:"return",
            result: "Mensagem processada no servidor WebSocket" 
        };
        const message = JSON.stringify(data);
        ws.send(message);
    } catch (error) {
        console.error(`Erro ao enviar dados: ${error}`);
    }
}

// forEach nos clientes conectados a porta 
// function sendAllConections(data) {
//     server.clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             sendJson(client, data);
//         }
//     });
// }

function connectionSucess(ws) {
    console.log('Conexão estabelecida.');

    ws.on('message', (message) => {
        const retunPct = verificaPct(message);
        
        if (retunPct != null) {
            sendJson(ws,retunPct);
        }
    });

    ws.on('close', () => {
        console.log('Conexão fechada.');
    });

    ws.on('error', (error) => {
        console.error(`Erro na conexão: ${error}`);
    });
}

function verificaPct(message) {
    try {
        const jsonString = message.toString();
        console.log(`Dados recebidos: ${jsonString}`);
        const jsonData = JSON.parse(jsonString);

        if (jsonData.cmd === "hours" ) {
            return jsonData            
        }
        if (jsonData.cmd === "json" ) {
            return jsonData            
        }
    } catch (error) {
        console.error("Erro ao deserializar JSON:", error);
        return null;
    }
}
