const express = require('express');
const chartData = express.Router();
const { MongoClient } = require('mongodb');
require("dotenv").config();
// const axios = require('axios');

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

chartData.get('/', async function (req,res){
  await connect();
  const findMoney = await collection.find({}).toArray();
  // res.send("jmhjhj");
  res.send(findMoney);
})

chartData.post('/', async function (req,res){
  await collection.insertOne(req.body);
  res.send("done");
})


module.exports = chartData;