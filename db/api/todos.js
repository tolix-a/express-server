const express = require('express');
const todos = express.Router();
const { MongoClient } = require('mongodb');
require("dotenv").config();

const dbName = 'todos';
const URL_KEY = process.env.TODOS_URL;
const url = URL_KEY;
const client = new MongoClient(url);

let collection;
async function connect(){
   await client.connect();
   const db = client.db(dbName);
   collection = db.collection('data');
   return;
}

todos.get('/', async function (req, res){
   await connect();
   const findResult = await collection.find({}).toArray();
   res.send( findResult )
})

todos.get('/:id', async function (req, res){
   let id = req.params;
   const findResult = await collection.find(id).toArray();

   res.send( findResult )
})

todos.post('/', async function (req, res){
   await collection.insertOne(req.body);
   res.send('done')
})

todos.put('/', async function (req, res){
   await collection.updateOne({id:req.body.id},{$set:req.body});
   res.send('done')
})

todos.delete('/', async function (req, res){
   await collection.deleteOne(req.query);
   res.send('done');
})

module.exports = todos;