const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const successNotification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  }

  const errorNotification = { ...successNotification, color: 'red' }

  return (
    <div style={message.error ? errorNotification : successNotification}>
      {message.message}
    </div>
  )
}

export default Notification