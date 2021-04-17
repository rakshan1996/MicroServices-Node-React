import React from 'react';


export default({comments})=>{
   
    const renderComments = Object.values(comments).map(comment => {
        let content;
        switch (comment.status){
            case "Approved":
                content= comment.content;
                break;
            case "Rejected":
                content = "This comment has been rejected";
                break;
            default:
                content = "This Comment is awaiting moderation";
        }
         
        return <li key={comment.id}>
            {content}
        </li>;
    });

    return <ul className="mb-2">
        {renderComments}
    </ul>;
};