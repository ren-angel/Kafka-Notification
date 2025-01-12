# Usa a imagem Node como base para o Back-end
FROM node:20-alpine

# Cria a pasta /backend dentro do contêiner e entra nela
WORKDIR /backend

# Copia apenas os arquivos necessários para instalar as dependências na pasta /backend
COPY package.json /backend/

# Instala TODAS as dependências (produção e desenvolvimento). Necessário para compilar o código TypeScript
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . /backend/

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Remove dependências de desenvolvimento após o build
RUN npm prune --production

# Indica que a aplicação dentro do contêiner é executada na porta 5000.
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]