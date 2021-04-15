const express = require('express');
const bodyParser = require('body-parser');

const axios = require('axios');


const app =express();
app.use(bodyParser.json());


app.post('/events',(req,res)=>{
    var data =res.data;

    if(data.type == "CommentCreated"){
        
    }
});


app.listen(4008,()=>{
    console.log("listening on 4008");
});
