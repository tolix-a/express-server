const express = require('express');
const chartData = express.Router();
const axios = require('axios');
const { MongoClient } = require('mongodb');
require("dotenv").config();

const dbName = 'todos';
const URL_KEY = process.env.TODOS_URL;
const url = URL_KEY;
const client = new MongoClient(url);


const API_KEY = process.env.NEWS_API_KEY;

chartData.get('/', async function (req,res){

  res.send("jmhjhj");
})


module.exports = chartData;