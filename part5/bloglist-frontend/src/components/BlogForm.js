import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setNotificationMessage, setBlogs, blogs, clearNotification, setBlogFormVisible }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handlePost = async (event) => {
    event.preventDefault()
    const addBlog ={
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    try {
      const newPost = await blogService.create(addBlog)
      setBlogs(blogs.concat(newPost))
      setNotificationMessage({
        message: `A new blog ${newPost.title} by ${newPost.author} added`,
        error: false
      })
      clearNotification(5000)
      setBlogFormVisible(false)
    } catch (exception) {
      setNotificationMessage({
        message: 'Failed to add blog',
        error: true
      })
      clearNotification(5000)
      console.error(exception)
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <>
      <h2>Create new</h2>
      <form onSubmit={handlePost}>
        <div>
            Title: <input id='title' value={newTitle} onChange={(event) => { setNewTitle(event.target.value) }} />
        </div>
        <div>
            Author: <input id='author' value={newAuthor} onChange={(event) => { setNewAuthor(event.target.value) }} />
        </div>
        <div>
            Url: <input id='url' value={newUrl} onChange={(event) => { setNewUrl(event.target.value) }} />
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  setNotificationMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  clearNotification: PropTypes.func.isRequired,
  setBlogFormVisible: PropTypes.func.isRequired
}

export default BlogForm