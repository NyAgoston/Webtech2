const mongoose = require('mongoose');

const mongoDB_Url = process.env.MongoDB_Url;

mongoose.connect(mongoDB_Url);

mongoose.connection.on('connected',()=>{
    console.log('Connected succesfully!');
});

mongoose.connection.on('error',(err)=>{
    console.log('valami szar');
});