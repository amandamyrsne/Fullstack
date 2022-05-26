import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [NotificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const clearNotification = (time) => {
    setTimeout(() => {
      setNotificationMessage(null)
    }, time)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({ message: 'Wrong username or password', error: true })
    }
    clearNotification(5000)
  }

  const loginForm = () => (
    <>
      <h2>Log in to application </h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }


  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  return (
    <div>

      <Notification message={NotificationMessage} />

      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in {' '}
            <button onClick={(event) => handleLogout(event)}>Logout</button>
          </p>
          <button style={hideWhenVisible} onClick={toggleVisibility}>Create new blog</button>
          <div style={showWhenVisible}>
            <BlogForm setNotificationMessage={setNotificationMessage} setBlogs={setBlogs} blogs={blogs} clearNotification={clearNotification} setBlogFormVisible={setBlogFormVisible} />
          </div>
          <button style={showWhenVisible} onClick={toggleVisibility}>Cancel</button>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} clearNotification={clearNotification} blogs={blogs}/> )}
        </div>
      }
    </div>
  )
}

export default App
