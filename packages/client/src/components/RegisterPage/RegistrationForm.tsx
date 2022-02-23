import React, { useState } from 'react'
import { Form, Button, Toast } from 'react-bootstrap'
import { createUser, getCSRFToken } from '../../utils/requests'
import { useNavigate } from 'react-router-dom'

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [outcome, setOutcome] = useState({
    message: '',
    hasError: false,
    submitted: false,
  })

  const handleChange = (e: any) => {
    e.preventDefault()

    setUser((oldState) => ({
      ...oldState,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    getCSRFToken().then(_ => createUser(user))
      .then(_=> navigate('/'))
      .catch((e) => {
        setOutcome({
          hasError: true,
          message: e.message,
          submitted: false,
        })
      })
  }

  const handleError = (e: any) => {
    e.preventDefault()
    setOutcome({
      hasError: false,
      submitted: false,
      message: '',
    })
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          value={user.email}
          onChange={handleChange}
          placeholder="Enter email" 
          required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Full Name</Form.Label>
        <Form.Control 
          type="text" 
          value={user.name}
          onChange={handleChange}          
          placeholder="Enter name" 
          required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          value={user.password}
          onChange={handleChange}          
          placeholder="Password" 
          required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
      { outcome.hasError &&  
        <Toast onClose={handleError} className="mt-3">
          <Toast.Header>Failed to log in</Toast.Header>
          <Toast.Body>{outcome.message}</Toast.Body>
        </Toast>
      }
    </Form>
  )
}

export default RegisterForm