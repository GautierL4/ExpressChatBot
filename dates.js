const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function connectDb(){
    const url = 'mongodb://localhost:27017/ExpressChatBot';
    const dbName = 'ExpressChatBot';
    const client = new MongoClient(url);

    try{
        await client.connect();
        const db = client.db(dbName);

        const col = db.collection('dates');

        let input = { date: new Date() };
        let insert = await db.collection('dates').insertOne(input);
        assert.equal(1, insert.insertedCount);

        const data = await col.find().toArray();
        console.log(data);
    }
    catch(ex){
        console.log(ex.stack);
    }
    client.close();
}

connectDb();