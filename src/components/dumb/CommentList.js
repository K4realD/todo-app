
function CommentList({task, comments}) {
  
  return (
   <ul className="elements__list">
      {comments.map((comment) => {
        if(comment._id === task.id) {
        return (
          <li className="element element_place_comments" key={comment.id}>
              <h2 className="element__text">{comment.text}</h2>
          </li>
        );}
      })}
    </ul> 
  );
} 

export default CommentList;