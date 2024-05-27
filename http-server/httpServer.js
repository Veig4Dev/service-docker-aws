const express = require('express');
const path = require('path');

const app = express();
const httpPort = 3000;

// Inicializando servidor HTTP
app.use(express.static(path.join(__dirname, 'public')));

app.listen(httpPort, () => {
    console.log(`Servidor HTTP iniciado na porta ${httpPort}. Acesse http://localhost:${httpPort}`);
});
