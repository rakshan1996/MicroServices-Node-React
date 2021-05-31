import React,{useState} from 'react';
import axios from 'axios';

export default ({postId}) => {
    const [content,setComment]=useState('');

    const submit =async (event) =>{
        event.preventDefault();

        await axios.post(`http://posts.com/posts/${postId}/comments`,{
            content
        });

        setComment('');
    }

    return <div>
        <form onSubmit={submit}>
            <div className ="form-group">
                <label>
                    New Comment
                </label>
                <input value={content} onChange={e=>setComment(e.target.value)} className="form-control"/>
            </div>
            <button className="btn btn-primary mt-2">Submit</button>
        </form>
    </div>;
};