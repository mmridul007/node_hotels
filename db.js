const mongoose = require('mongoose')
require('dotenv').config()

const mongoURL = process.env.mongoURL

mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to mongo server successfully')
})

db.on('error',(err)=>{
    console.log('MongoDB connection error:',err)
})

db.on('disconnected',()=>{
    console.log('Disonnected to mongo server')
})

module.exports = db;
