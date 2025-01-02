const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const todos = require('./db/api/todos');
const news = require('./db/api/news');
const chartData = require('./db/api/account');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/todos', todos);
app.use('/news', news);
app.use('/chartData', chartData);

app.listen(4000)

/* 
   1. server폴더 생성
   2. npm   init   -y
   3. npm   install   express   cors   body-parser
   4. index.jsno
*/