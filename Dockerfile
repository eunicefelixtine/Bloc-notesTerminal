# Image de base
FROM node:22-alpine

# Répertoire de travail
WORKDIR /app

#Définition des variables pour node-gyp en cas de build natif
#ENV PYTHONUNBUFFERED=1

#Outils de compilation requis pou better-sqlite3 sur Alpine
RUN apk add --no-cache python3 make g++ sqlite-dev

# Copie des fichiers de dépendances
COPY package*.json ./

# Forcer node-gyp à utiliser le serveur officiel au lieu d'unofficial-builds
ENV npm_config_tarball_url=https://nodejs.org/dist/v22.23.2/node-v22.23.2/node-v22.23.2-headers.tar.gz

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
