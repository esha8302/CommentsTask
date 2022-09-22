import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'

function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({
    username: "",
    comment_data: "",
    reply_id: "",
    blog_id: `${id}`
  })

  const getBlogDetail = async () => {
    const api = await fetch(`http://127.0.0.1:8000/blog-detail/${id}/`, {
      method: "GET"
    })
    const res = await api.json();
    setBlog(res)
    setComments(res.comments)
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    setNewComment({ ...newComment, [name]: value })
  }

  const submitComment = async (e) => {
    // e.preventDefault();
    const api = await fetch(`http://localhost:8000/comments/${id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newComment)
    })
    const res = await api.json()
    // console.log(res)
  }

  useEffect(() => {
    getBlogDetail();
  }, [])

  return (
    <>
      <div className='container'>
        <h1 className='display-1'>{blog.title}</h1>
        <hr />
        <article style={{fontSize:"20px"}}>{blog.content}</article>

        <div className='comments'>
          <hr />

          <div className='comment-form-title'>Add a Comment</div>
          <Form>
            <Form.Control className='my-3' size="sm" type="text" name="username" value={newComment.username} onChange={changeHandler} placeholder='Name' />
            <Form.Control className='my-3' size="sm" as="textarea" name="comment_data" value={newComment.comment_data} onChange={changeHandler} placeholder='Comment' />
            <button className='btn btn-dark btn-sm' onClick={submitComment}>Submit</button>
          </Form>

          <div className='comments-container'>
            {/* {console.log(comments)} */}
            {comments.length > 0 && comments.map((comment, index) => {
              console.log(comment)
              if (comment.reply_id == null)
                return (
                  <RenderComment comment={comment} />
                )
            }
            )}
          </div>
        </div>

      </div>
    </>
  )
}

export default BlogDetail

const RenderComment = (props) => {
  const comment = props.comment
  const [reply, setReply] = useState({
    blog_id: comment.blog_id,
    username: "",
    comment_data: "",
    reply_id: comment.id,
  })
  const [isReplying, setIsReplying] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setReply({ ...reply, [name]: value });
  }

  const replyToComment = async (e, id) => {
    // e.preventDefault()
    // console.log(reply)
    const api = await fetch(`http://localhost:8000/comments/${comment.blog_id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reply)
    })
    const res = await api.json()
    // console.log(res)
  }

  return (
    <div className='comment'>

      <div className="comment-image-container">
        <img src="http://cdn.onlinewebfonts.com/svg/img_184513.png" alt="User Icon" />
      </div>

      <div className="comment-content">
        <div className="comment-author">{comment.username}</div>
        <div>{comment.date_added}</div>
      </div>
      <div className="comment-text">{comment.comment_data}</div>
      <div className="comment-action" onClick={() => setIsReplying(true)}>Reply</div>
      {isReplying &&
        <div>
          <Form>
            <Form.Control className='my-3' size="sm" type="text" name="username" value={reply.username} onChange={handleChange} placeholder='Name' />
            <Form.Control className='my-3' size="sm" as="textarea" name="comment_data" value={reply.comment_data} onChange={handleChange} placeholder='Comment' />
            <button className='btn btn-outline-primary btn-sm' onClick={(e) => replyToComment(e)}>Submit</button>
            <button className='btn btn-outline-dark btn-sm mx-3' onClick={(e) => setIsReplying(false)}>Cancel</button>
          </Form>
        </div>
      }

      <div className="replies">

        {comment.replies && comment.replies.map((reply) => {
          return (
            <RenderComment comment={reply} />
          )
        })}

      </div>

    </div>
  )
}


