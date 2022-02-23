import React from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RegisterForm from './RegistrationForm'

const RegisterPage: React.FC = () => {
  return (
    <div className='register-page'>
      <Container>
        <Row className="mt-5">
          <Col>
            <h1>Register</h1>
          </Col>
        </Row>
        <Row>
          <Col md="auto">
            <RegisterForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/">
              <Button variant="link">Or log in</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RegisterPage