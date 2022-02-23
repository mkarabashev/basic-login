import React, { useState } from 'react'
import { Form, Button, Toast } from 'react-bootstrap'
import { authenticate, getCSRFToken } from '../../utils/requests'
import { useNavigate } from 'react-router-dom'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [outcome, setOutcome] = useState({
    message: '',
    hasError: false
  })

  const handleChange = (e: any) => {
    e.preventDefault()
    setCredentials((oldState) => ({
      ...oldState,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    getCSRFToken()
      .then(_ => authenticate(credentials.email, credentials.password))
      .then(_=> navigate('/user'))
      .catch((e) => {
        setOutcome({
          hasError: true,
          message: e.message
        })
      })
  }

  const handleError = (e: any) => {
    e.preventDefault()
    setOutcome({
      hasError: false,
      message: ''
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email"
          value={credentials.email}
          onChange={handleChange}          
          placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
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

export default LoginForm