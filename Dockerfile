# Usa a imagem Node como base para o Back-end
FROM node:20-alpine

# Cria a pasta /backend dentro do contêiner e entra nela
WORKDIR /notification

# Copia apenas os arquivos necessários para instalar as dependências na pasta /backend
COPY package.json /notification/

# Instala TODAS as dependências (produção e desenvolvimento). Necessário para compilar o código TypeScript
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . /notification/

# Instala o bash para rodar o script wait-for-it.sh
RUN apk add --no-cache bash

# Copia o script wait-for-it.sh para o contêiner
COPY wait-for-it.sh /wait-for-it.sh

# Dá permissão de execução ao script
RUN chmod +x /wait-for-it.sh

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Remove dependências de desenvolvimento após o build
RUN npm prune --production

# Indica que a aplicação dentro do contêiner é executada na porta 5000.
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]