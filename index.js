const express = require("express");
const app = express();

// Instrução para o Express usar o EJS como View engine
app.set('view engine','ejs');

app.get("/",function(req,res){
    //res.send("<h1>Bem vindo à plataforma de Perguntas e Respostas</h1>");
    res.render("index");
});

app.listen(8080,()=>{console.log("Servidor ativo!");});