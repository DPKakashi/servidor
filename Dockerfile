# Especificamos los archivos o modulos que necesita la aplicación para funcionar en cualquier sistema
FROM node:16

# Especificamos en que lugar se va a ejecutar el proyecto
WORKDIR /app

# Copiar todos los archivos llamados package
COPY package*.json ./

#Instalar las dependencias
RUN npm install

#Copiar todos los archivos de la carpeta
COPY . .

#Ejecutamos el script creado en el package.json
CMD [ "npm", "start" ]