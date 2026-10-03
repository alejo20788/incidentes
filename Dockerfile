# 1. Usar una imagen oficial de Node.js como base
FROM node:20

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias y el esquema de Prisma
COPY package*.json ./
COPY prisma ./prisma/

# 4. Instalar las dependencias y fijar la versión estable de Prisma
RUN npm install
RUN npm install prisma@5 @prisma/client@5

# 5. Generar el cliente de Prisma para que interactúe con la base de datos
RUN npx prisma generate

# 6. Copiar el resto del código de tu proyecto
COPY . .

# 7. Exponer el puerto que utiliza nuestro servidor web
EXPOSE 3000

# 8. Comando para ejecutar las migraciones de Prisma e iniciar el servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]