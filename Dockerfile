# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

# our app is running on port 8080 within the container, so need to expose it
EXPOSE 8082

# the command that starts our app
# CMD ["node", "js/server.js"]
# CMD pm2 start js/server.js --name='Server1' --watch -- PORT 8081
# CMD node js/server.js 8081 FORK
# docker-compose up --build

CMD node js/server.js --name='Server2' --watch -i 8 -- PORT 8082