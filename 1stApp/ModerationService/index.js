const express = require('express');
const bodyParser = require('body-parser');

const axios = require('axios');


const app =express();
app.use(bodyParser.json());

const handleEvent=async (type,data)=>{
    if (type === 'CommentCreated') {
        const status = data.content.toLowerCase().includes('orange') ? 'Rejected' : 'Approved';
        data.status = status;
         await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: data
        });

    }
}


app.post('/events',async (req,res)=>{
    var {type,data} =req.body;
    handleEvent(type,data);
    res.send({});
});


app.listen(4008,async ()=>{
    console.log("listening on 4008");
    const events = await axios.get('http://localhost:4005/events');
    for (let event of events.data) {
        handleEvent(event.type, event.data);
    }
});
