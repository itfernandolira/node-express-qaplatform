const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com a base de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Instrução para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* app.get("/:nome/:lang",function(req,res){
    //res.send("<h1>Bem vindo à plataforma de Perguntas e Respostas</h1>");
    //res.render("index");
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: "Doritos",preco: 3.14},
        {nome: "Coca-cola",preco:5},
        {nome: "Leite",preco:1.45},
        {nome: "Carne", preco:15},
        {nome: "Redbull", preco: 6},
        {nome: "Nescau", preco: 4}
    ]

    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: "FLAG",
        inscritos: 8040,
        msg: exibirMsg,
        produtos: produtos
    });
});
 */
app.get("/",function(req,res){
    /*Pergunta.findAll().then(perguntas => {
        console.log(perguntas);
    });*/
    Pergunta.findAll({raw: true}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });

    //res.render("index");
});

app.get("/ask",function(req,res){
    res.render("ask");
});

app.post("/storequestion",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(4000,()=>{console.log("Servidor ativo!");});