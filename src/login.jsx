import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null);
    const login = () => {
        if (!["omar@dmetvoip.onsip.com", "omar3@dmetvoip.onsip.com"].includes(email) || password != "123") {
            return setError("Invalid username or password")
        }
        sessionStorage.setItem('email', email)

        navigate("home")
    }
    return (
        <Container className=' justify-content-center text-center align-content-center background w-100'>
            <Row className='justify-content-center text-center align-content-center'>
                <Image fluid='true' className='d-block w-25 ms-auto me-auto' src="profile.png" />
                <Card border='primary' className="text-center justify-content-center mt-auto mb-auto w-50">

                    <Card.Body>
                        <Card.Title>Login Details</Card.Title>
                        {error && <Alert key={"danger"} variant={"danger"}>
                            {error}
                        </Alert>}
                        <Row>
                            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text id="passwordHelpBlock" muted >

                            </Form.Text>
                        </Row>
                        <Row>
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" onClick={login}>Login</Button>
                    </Card.Footer>
                </Card>
            </Row>

        </Container>
    )
}

export default Login