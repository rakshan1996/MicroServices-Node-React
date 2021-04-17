const express = require('express');
const bodyParser = require('body-parser');

const axios = require('axios');


const app =express();
app.use(bodyParser.json());


app.post('/events',async (req,res)=>{
    var {type,data} =req.body;

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange')?'Rejected':'Approved';
        data.status=status;
        await axios.post('http://localhost:4005/events',{
            type:'CommentModerated',
           data: data
        });

    }

    res.send({});
});


app.listen(4008,()=>{
    console.log("listening on 4008");
});
