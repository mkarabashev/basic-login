import React, { useEffect, useState } from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import { getCSRFToken, getUser, logout } from '../../utils/requests'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    getUser().then(user => setUser(user))
  }, [])

  const handleLogout = (e: any) => {
    e.preventDefault()
    getCSRFToken()
      .then(_ => logout())
      .then(_=> navigate('/'))
      .catch(_ => navigate('/'))
  }

  return (
    <div className='register-page'>
      <Container>
        <Row className="mt-5">
          <Col>
            <h1>Welcome {user.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="link" onClick={handleLogout}>To log out click here</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RegisterPage