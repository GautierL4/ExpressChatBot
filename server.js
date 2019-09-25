const express = require('express')
const app = express()

app.get('/', function(req,res){
    res.send('Hello World')
})

app.get('/hello', function(req,res){
    if(req.query.nom){
        res.send('Bonjour, ' + req.query.nom)
    }
    else{
        res.send('Quel est votre nom ?')
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT , function() {
    console.log(`App listening on port ${ PORT }`)
})