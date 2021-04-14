import React from 'react';


export default({comments})=>{
   
    const renderComments = Object.values(comments).map(comment => {
        return <li key={comment.id}>
            {comment.content}
        </li>;
    });

    return <ul className="mb-2">
        {renderComments}
    </ul>;
};