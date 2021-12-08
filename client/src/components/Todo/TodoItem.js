import React from 'react'

function TodoItem({ name }) {
  return (
    <>
      <li style={{ marginBottom: '0.5em' }}>{name}</li>
    </>
  )
}

export default TodoItem
