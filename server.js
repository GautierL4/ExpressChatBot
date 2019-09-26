const express = require('express')
const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));


app.get('/', function(req,res){
    res.send('Hello World')
})

app.get('/hello', function(req,res){
    if(req.query.nom){
        res.send(`Bonjour, ${req.query.nom}`)
    }
    else{
        res.send('Quel est votre nom ?')
    }
})

app.post('/chat', function(req,res){
    var data = req.body.msg;
    if(data == "ville"){
       res.send("Nous sommes à Paris");
    }
    if(data == "météo"){
        res.send("Il fait beau");
    }
    
})

const PORT = process.env.PORT || 3000
app.listen(PORT , function() {
    console.log(`App listening on port ${ PORT }`)
})