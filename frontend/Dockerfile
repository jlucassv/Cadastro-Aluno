# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos do seu diretório local para o diretório de trabalho no contêiner
COPY package*.json ./
COPY . .

# Instale as dependências do seu projeto
RUN npm install

# Exponha a porta em que o seu aplicativo irá rodar
EXPOSE 3000

# Comando para iniciar o seu aplicativo quando o contêiner for iniciado
CMD ["node", "menu.js"]
