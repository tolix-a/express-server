const express = require('express');
const news = express.Router();
const axios = require('axios');
require("dotenv").config();

const API_KEY = process.env.NEWS_API_KEY;

news.get('/', async function (req,res){
  console.log('=======dfdf=====');
  const [eco, poli, soci, cul] = await Promise.all([
    axios.get(`https://api-v2.deepsearch.com/v1/articles/economy?&page_size=10&api_key=${API_KEY}`),
    axios.get(`https://api-v2.deepsearch.com/v1/articles/politics?&page_size=3&api_key=${API_KEY}`),
    axios.get(`https://api-v2.deepsearch.com/v1/articles/culture?&page_size=3&api_key=${API_KEY}`),
    axios.get(`https://api-v2.deepsearch.com/v1/articles/society?&page_size=3&api_key=${API_KEY}`)
  ]);
  console.log(eco,'============');

  const result = {
    economy: eco.data,
    politics: poli.data,
    society: soci.data,
    culture: cul.data
  };
  // const sliceResult = {
  //   economy: [result.economy[0], result.economy.slice(1, 3)],
  //   politics: [result.politics[0], result.politics.slice(1, 3)],
  //   society: [result.society[0], result.society.slice(1, 3)],
  //   culture: [result.culture[0], result.culture.slice(1, 3)]
  // };
 
  res.send(result);
})

// news.get('/', async function (req, res){
//   const {m,s} = req.query;

//   const api = await axios.get(`https://api-v2.deepsearch.com/v1/${m}/${s}?&page_size=20&api_key=${API_KEY}`);
//   res.send( api.data );
// })

async function handleArticle(req, res) {
  const { m, s } = req.query;
  const api = await axios.get(`https://api-v2.deepsearch.com/v1/${m}/${s}?&page_size=20&api_key=${API_KEY}`);
  res.send( api.data );
}
news.get('/articles', handleArticle);
news.get('/global', handleArticle);


news.get('/search', async function (req, res){
  const {m, keyword} = req.query;

  const api = await axios.get(`https://api-v2.deepsearch.com/v1/${m}?keyword=${keyword}&page_size=20&api_key=${API_KEY}`);
  res.send( api.data );
})

module.exports = news;