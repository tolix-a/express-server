const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require("dotenv").config();

const dbName = 'chartData';
const URL_KEY = process.env.TODOS_URL;
const url = URL_KEY;
const client = new MongoClient(url);

let collection;
async function connect(){
  await client.connect();
  const db = client.db(dbName);
  collection = db.collection('sum');
  return;
}

router.get('/', async function (req,res){
  await connect();
  const findMoney = await collection.find({}).toArray();
  res.send(findMoney);
})

router.post('/', async function (req,res){
  const result = await collection.insertOne(req.body);
  res.json({
    ...req.body,
    _id: result.insertedId
  });
})

router.delete('/:id', async function (req, res) {
  const {id} = req.params;
  await collection.deleteOne({id: Number(id)});
  res.json({ message: '삭제 완료' });
})


module.exports = router;