# Usando uma imagem base oficial do Node.js
FROM node:16-alpine

# Criando diretório de trabalho
WORKDIR /usr/src/app

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalando dependências
RUN npm install

# Copiando o restante dos arquivos da aplicação
COPY . .

# Expondo a porta necessária
EXPOSE 7788

# Comando para rodar a aplicação
CMD ["node", "localReceiver.js"]
