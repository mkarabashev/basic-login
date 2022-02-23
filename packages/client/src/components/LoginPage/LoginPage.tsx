import React from 'react'
import LoginForm from './LoginForm'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginPage: React.FC = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col md="auto">
          <LoginForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to='/register'>
            <Button variant="link">Or sign up</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage