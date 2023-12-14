const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

app.use(express.json());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/users', userRouter);

//Connect to MongoDb
mongoose.connect('mongodb+srv://t2geg3:Asdfgh1234@cluster0.nnpnsio.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.listen(3000, () => console.log("Server listening on Port 3000 :-"));