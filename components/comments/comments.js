import {useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { postId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (showComments) {
      fetch('/api/comments/' + postId)
        .then(response => response.json())
        .then(data => {
          // 응답 데이터에서 만든 comments 키를 가져온다
          // 가져온 댓글로 상태를 살정해준다
          setComments(data.comments)
        })
    }
  }, [showComments, postId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    // 토글로 댓글을 표시할때마다 GET 요청을 보내 댓글을 로드해야한다

  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch('/api/comments/' + postId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      // 응답을 기다리고, 파싱하고
      .then(response => response.json())
      // 데이터를 가져올 수 있다
      .then(data => console.log(data))

  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments;