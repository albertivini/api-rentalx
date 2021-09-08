# imagem
FROM node

# diretório
WORKDIR /usr/app

# copia o package.json para o diretório /usr/app  dentro do container
COPY package.json ./

# instala as dependencias do package.json no diretório /usr/app do container
RUN npm install 

# copia tudo que está na minha pasta para dentro da pasta /usr/app dentro do container
COPY . .

# expondo a porta 3333 do container 
EXPOSE 3333

# rodando a aplicação a partir do prompt d comando
CMD ["npm", "run", "dev"] 


## Para buildar o container:
    ## docker build -t rentx .
    ## rentx = nome da imagem | . é aonde que está os arquivos da aplicação

## Para rodar o container: 
    ## docker run -p 3333:3333 rentx
    ## -p porta 3333 do container e da maquina | rentx nome da imagem

## Para ver containers ativos: 
    ## docker ps

## Para ver todos os containers:
    ## docker ps -a

## Para acessar containers ativos:
    ## docker exec -it "nome do container (não é o nome da imagem)" bash

## Para parar containers ativos: 
    ## docker container stop "nome do container"
    ## docker stop "id do container"

## Para remover containers:
    ## docker rm "id do container"