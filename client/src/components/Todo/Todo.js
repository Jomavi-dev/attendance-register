import { useState, useContext, useEffect } from 'react'
import TodoService from '../../services/TodoService'
import { AuthContext } from '../../context/AuthContext'
import TodoItem from './TodoItem'
import MessageBox from '../Message/Message'

function Todo() {
  let initTodo = { name: '' }
  const [todo, setTodo] = useState(initTodo)
  const [todos, setTodos] = useState([])
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    TodoService.getTodos().then(data => {
      setTodos(data.todos)
    })
    document.getElementById('todo').focus()
  }, [])

  const handleChange = e => {
    const { value } = e.target
    setTodo({ name: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    TodoService.postTodo(todo).then(data => {
      const { message } = data
      if (!message.msgError) {
        TodoService.getTodos().then(data => {
          setTodos(data.todos)
          setMessage(message)
        })
      }
      else if (message.msgBody === 'Unauthorized') {
        setMessage(message)
        authContext.setUser({ username: '', role: '' })
        authContext.setIsAuth(false)
      }
      else setMessage(message)

      setTodo(initTodo)
    })
  }

  const { name: todoName } = todo
  return (
    <div className="container py-5">

      {message && <MessageBox {...message} />}

      <h2 className="text-center mb-4 mx-4">Todos List</h2>


      <ul className="list-group mb-4 container-form">
        {todos.map(todo => <TodoItem key={todo._id} {...todo} />)}
      </ul>

      <form onSubmit={handleSubmit} className="container-form">
        <div className="mb-3">
          <label htmlFor="todo" className="form-label">Add todo</label>
          <input
            required
            type="text"
            id="todo"
            name="todo"
            placeholder="Enter todo"
            value={todoName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary form-control">Add Todo</button>
      </form>
    </div>
  )
}

export default Todo