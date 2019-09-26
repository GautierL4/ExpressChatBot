const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const dbName = 'ExpressChatBot';

async function connectDb(){
    const url = 'mongodb://localhost:27017/ExpressChatBot';
    
    const client = new MongoClient(url);

    try{
        await client.connect();
        return client;
    }
    catch(ex){
        console.log(ex.stack);
    }
}

async function getAllMessages(){
    try{
        var client = await connectDb();
        var db = client.db(dbName);
        var messagesCol = db.collection('messages');
        var data = await messagesCol.find().toArray();
        return data;
    }
    catch(ex){
        console.log(ex.stack);
    }
}

async function insertData(id, content){
    try{
        var client = await connectDb();
        var db = client.db(dbName);
        let data = {
            from: id,
            msg: content,
        }
        await db.collection('messages').insertOne(data);
        console.log("Data inserted");
    }
    catch(ex){
        console.log(ex.stack)
    }
}

async function deleteLastData(){
    try{
        var client = await connectDb();
        var db = client.db(dbName);
        await db.collection('messages').findOneAndDelete({},{"sort": { "_id": -1}})
    }
    catch(ex){
        console.log(ex.stack)
    }
}

app.get('/messages/all', async function (req,res){
    let data = await getAllMessages()
    res.send(data);
})

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

app.post('/chat', async function(req,res){
    var data = req.body.msg;
    if(data == "ville"){
       res.send("Nous sommes à Paris");
    }
    if(data == "météo"){
        res.send("Il fait beau");
    }
    if(data == "demain"){
        await insertData("user","demain")
        let response = "Demain: Mercredi"
        res.send(response)
        await insertData("bot",response)
    }
})

app.delete('/messages/last',async function(req,res){
    await deleteLastData();
    console.log("Last document deleted");
})

const PORT = process.env.PORT || 3000
app.listen(PORT , function() {
    console.log(`App listening on port ${ PORT }`)
})