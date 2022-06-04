import React, { useState }  from 'react';
import { useHistory } from "react-router-dom";

import {Container, Form, Button} from 'react-bootstrap';

import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <Toaster />
            <Container className='form-height'>
                <Form className='form-signin' onSubmit={ event => register(event)}>
                    <div className='text-center'>
                    </div>
                    <br/>
                    <h3>Register</h3>
                    <hr/>
                    <Form.Group controlId="formBasicEmail" className='formInput'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={ event => setName(event.target.value)} placeholder="Name" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className='formInput'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={ event => setEmail(event.target.value)} placeholder="Email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className='formInput'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={ event => setPassword(event.target.value)} placeholder="Password"  required/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className='registerButton'>
                        Register
                    </Button>

                    <Button variant="link" className='loginLink' onClick={() => history.push('/login')}>
                        Already have an account?
                    </Button>

                </Form>
            </Container>
        </div>
    )
}

export default Register