require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const connectDB = require('./database/connectDB');
const userRouter = require('./router/user.router');
const xss = require('xss-clean');
const helmet = require('helmet');












const app = express();
connectDB();



const port = process.env.PORT || 3067;



app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.use(cors({
  credentials : true,
  origin : '*',
  optionsSuccessStatusCode: 200,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xss());
app.use(helmet());


app.use('/api', userRouter);


app.use(function(req, res, next) {
  next(createError(404));
});






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

