require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const connectDB = require('./database/databs');
const userRouter = require('./router/user.router');












const app = express();
connectDB();



const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', userRouter);


app.use(function(req, res, next) {
  next(createError(404));
});






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

