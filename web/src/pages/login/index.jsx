import React, { useState }  from 'react';
import { useHistory } from "react-router-dom";

import {Container, Form, Button} from 'react-bootstrap';

import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
        <Toaster />
        <Container className='form-height'>
                <Form className='form-signin' onSubmit={ event => login(event)} >
                    <div className='text-center'>
                    </div>
                    <br/>
                    <h3>Login</h3>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={ event => setEmail(event.target.value)} placeholder="Email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={ event => setPassword(event.target.value)} placeholder="Password"  required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='loginButton'>
                        Login
                    </Button>

                    <Button variant="link" className='registerLink' onClick={() => history.push('/register')}>
                        Don't have an account? 
                    </Button>
                    
                    
                </Form>
            </Container>
        
        </div>
    )
}

export default Login;