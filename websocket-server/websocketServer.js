const WebSocket = require('ws');

const PORT = 7788;
const server = new WebSocket.Server({ port: PORT });

// Inicializando servidor WebSocket
server.on('listening', () => {
    console.log(`Servidor WebSocket iniciado na porta ${PORT}.`);
});

server.on('connection', connectionSucess);

function sendJson(ws, data) {
    try {
        const message = JSON.stringify(data);
        ws.send(message);
        console.log(`Enviando dados: ${message}`);
    } catch (error) {
        console.error(`Erro ao enviar dados: ${error}`);
    }
}

// forEach nos clientes conectados a porta 
function sendAllConections(data) {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            sendJson(client, data);
        }
    });
}

function connectionSucess(ws) {
    console.log('Conexão estabelecida.');

    ws.on('message', (message) => {
        const retunPct = verificaPct(message);
        
        if (retunPct != null) {
            sendAllConections(retunPct);
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
////////////////    RETORNO  //////////////////
        if (jsonData.ret === "settime" ) {
            console.log(jsonData.ret + ":" + jsonData.result);
            return null            
        }
        if (jsonData.ret === "setuserinfo" ) {
            console.log(jsonData.ret + ":" + jsonData.result);
            return null            
        }
////////////////    ENVIO  //////////////////
        if (jsonData.cmd === "settime" ) {
          console.log(`Configurando data e hora no equipamento...`);
            return jsonData
        }
        if (jsonData.cmd === "setuserinfo" ) {
          console.log(`Cadastrando funcionario no Equipamento... `);
            return jsonData
        }
////////////////    PADRAO  //////////////////
        if (jsonData.cmd === "reg") {            
            return null;
        }
    } catch (error) {
        console.error("Erro ao deserializar JSON:", error);
        return null;
    }
}
