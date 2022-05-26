import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs, setNotificationMessage, clearNotification, blogs }) =>   {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async (blogPost) => {
    try {
      blogService.update(blogPost.id, {
        user: blogPost.user.id,
        likes: blogPost.likes + 1,
        author: blogPost.author,
        title: blogPost.title,
        url: blogPost.url
      })
    } catch (exception) {
      console.error(exception)
    }
  }
  const handleUpdate = (event) => {
    event.preventDefault()
    addLike(blog)
    if(blog.likes === null){
      blog.likes = 0
    }
    setLikes(likes + 1)

  }
  const removeBlog = async (blog) => {
    try{
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((blogs) => blogs !== blog))
        setNotificationMessage({ message: 'Blog deleted', error: false })
        clearNotification(5000)
      }
    } catch (exception) {
      console.error(exception)
      setNotificationMessage({ message:'Failed to delete blog', error:true })
      clearNotification(5000)
    }
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    <div>
      {visible ? (
        <div style={blogStyle}>
          {blog.title} {' '}
          <button onClick={() => setVisible(!visible)}>Hide</button>
          <p>{blog.url}</p>
          <p>
          Likes: {likes} {' '}
            <button onClick={handleUpdate}>
            Like
            </button>
          </p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button onClick={handleRemove}>Remove</button>
          )}
        </div>
      ) : (
        <div>
          {blog.title}, by {blog.author} {' '}
          <button onClick={() => setVisible(!visible)}>View</button>
        </div>
      )}
    </div>
  )
}
export default Blog