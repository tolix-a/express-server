const express = require('express');
const news = express.Router();
const axios = require('axios');
require("dotenv").config();

const API_KEY = process.env.NEWS_API_KEY;

news.get('/', async function (req, res){
  const {m,s} = req.query;

  const api = await axios.get(`https://api-v2.deepsearch.com/v1/${m}/${s}?&date_from=2024-09-25&date_to=2024-10-28&page_size=10&api_key=${API_KEY}`);
  res.send( api.data );
})

news.get('/search', async function (req, res){
  const {m, keyword} = req.query;

  const api = await axios.get(`https://api-v2.deepsearch.com/v1/${m}?keyword=${keyword}&api_key=${API_KEY}`);
  res.send( api.data );
})

module.exports = news;