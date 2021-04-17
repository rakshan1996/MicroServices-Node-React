const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app =express();

app.use(bodyParser.json());
app.use(cors());

const posts={}; 

const handleEvent = (type,data) =>{
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated') {
        const { id, content, status, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    if (type === 'CommentUpdated') {
        const { postId, id, status, content } = data;
        const comments = posts[postId].comments;
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
};

app.get('/posts',(req,res) => {
    res.send(posts);
});


app.post('/events',(req,res)=>{
    const {type,data}= req.body;
    handleEvent(type,data);
    res.send({});
});



app.listen(4002,async ()=>{
    console.log('listening on 4002');
    const events = await axios.get('http://localhost:4005/events');
    for(let event of events.data){
        handleEvent(event.type,event.data);
    }
})
