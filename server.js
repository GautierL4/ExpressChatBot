const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req,res){
    res.send('Hello World')
})

app.listen(port||3000 , function() {
    console.log('App listening on port 3000')
})