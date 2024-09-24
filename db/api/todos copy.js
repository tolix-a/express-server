const express = require('express');
const todos = express.Router();
const { MongoClient } = require('mongodb');

const dbName = 'todos';
const url = 'mongodb+srv://bluii0157:rhfkslfjqj@cluster0.lx7ow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);


async function connect(){
   await client.connect();
   const db = client.db(dbName);
   return db.collection('data');
}


todos.get('/', async function (req, res){
   const collection = await connect();
   const findResult = await collection.find({}).toArray();
   client.close(); 
   // 얘만 쓰면 에러

   res.send( findResult )
})


todos.get('/:id', async function (req, res){
   let id = req.params;

   const collection = await connect();
   const findResult = await collection.find(id).toArray();
   client.close();

   res.send( findResult )
})

todos.post('/', async function (req, res){
   const collection = await connect();   
                     await collection.insertOne(req.body);
   // const findResult = await collection.find({}).toArray();
   client.close();
   res.send('done')
})

todos.put('/', async function (req, res){
   const collection = await connect();   
                     await collection.updateOne({id:req.body.id},{$set:req.body});
   // const findResult = await collection.find({}).toArray();
   client.close();

   res.send('done')
})


todos.delete('/', async function (req, res){
   const collection = await connect();   
                     await collection.deleteOne(req.query);
   // const findResult = await collection.find({}).toArray();
   client.close();

   res.send('done')
})

module.exports = todos;