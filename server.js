import { createServer, request } from 'node:http';
import fs from "node:fs";
import { v4 as uuidv4 } from 'uuid';
import { URLSearchParams } from 'node:url';

import lerDadosLivros from "./helper/lerDadosLivros.js"
const PORT = 3333;

const server = createServer((request, response) => {
    const {url, method} = request;


    if(method === "GET" && url === '/livros'){
        lerDadosLivros((err, livros)=>{
            if(err){
                response.writeHead(500, {"Content-Type": "application/json"})
                response.end(JSON.stringify({message: "Error ao ler dados"}))
                return
            }
           
            response.writeHead(200, {"Content-Type": "application/json"})
            response.end(JSON.stringify(livros))
        })

    }else if(method === "POST" && url === '/livros'){
        let body = ""
     request.on("data", (chunk)=>{
      body += chunk;
     })
     request.on('end', ()=>{
      const novoLivro = JSON.parse(body)
      lerDadosLivros((err, livros)=>{
         if(err){
            response.writeHead(500,{"Content-Type":"application/json"})
            response.end(JSON.stringify({message:"Erro ao ler livros"}))
            return
         }
         novoLivro.id = uuidv4();
         livros.push(novoLivro);

         fs.writeFile("livros.json", JSON.stringify(livros, null, 2), (err) =>{
            if(err){ 
            response.writeHead(500, {"Content-Type":"application/json"})
            response.end(JSON.stringify({message:"Erro ao cadastrar livro"}))
            return
         }
         response.writeHead(201,{"Content-Type":"application/json"})
         response.end(JSON.stringify({novoLivro}))
         })
      })
     })
    }else if(method === "POST" && url.startsWith('/autores')){
        let body = ""
        request.on("data", (chunk)=>{
         body += chunk;
        })
        request.on('end', ()=>{
         const novoAutor = JSON.parse(body)
         lerDadosLivros((err, autor)=>{
            if(err){
               response.writeHead(500,{"Content-Type":"application/json"})
               response.end(JSON.stringify({message:"Erro ao ler autor"}))
               return
            }
            novoAutor.id = uuidv4();
            autor.push(novoAutor);
   
            fs.writeFile("livros.json", JSON.stringify(autor, null, 2), (err) =>{
               if(err){ 
               response.writeHead(500, {"Content-Type":"application/json"})
               response.end(JSON.stringify({message:"Erro ao cadastrar autor"}))
               return
            }
            response.writeHead(201,{"Content-Type":"application/json"})
            response.end(JSON.stringify({novoAutor}))
            })
         })
        })
    }else if(method === "POST" && url.startsWith('/editora')){
        let body = ""
        request.on("data", (chunk)=>{
         body += chunk;
        })
        request.on('end', ()=>{
         const novaEditora = JSON.parse(body)
         lerDadosLivros((err, editora)=>{
            if(err){
               response.writeHead(500,{"Content-Type":"application/json"})
               response.end(JSON.stringify({message:"Erro ao ler autor"}))
               return
            }
            novaEditora.id = uuidv4();
            editora.push(novaEditora);
   
            fs.writeFile("livros.json", JSON.stringify(editora, null, 2), (err) =>{
               if(err){ 
               response.writeHead(500, {"Content-Type":"application/json"})
               response.end(JSON.stringify({message:"Erro ao cadastrar autor"}))
               return
            }
            response.writeHead(201,{"Content-Type":"application/json"})
            response.end(JSON.stringify({novaEditora}))
            })
         })
        })
    }else if(method === "GET" && url.startsWith('/livros/')){

    }else if(method === "GET" && url.startsWith('')){
     
    }else if(method === "DELETE" && url.startsWith('/DeletarAutor/')){
        const id = parseInt(url.split('')[2])
        const indexAutor = autores.findIndex((Autor)=> Autor.id === id
        );
        if (indexAutor === -1) {
            response.writeHead(404, { "Content-Type": "application/json"});
            response.end(JSON.stringify({ message: "Autor não encontrado"}));
            return;
        }
        autores.slice(indexAutor -1)
        response.writeHead(200, { "Content-Type": "application/json"});
        response.end(JSON.stringify({ message: "Autor não encontrado"}));

    }else if(method === "GET" && url.startsWith('')){
        const urlParams = new URLSearchParams(url.split("?")[1])
       

        
    }else {
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Página não encontrada'}))
    }
});

server.listen(PORT, ()=>{
    console.log(`Servidor on port http://localhost:${PORT}`);
});