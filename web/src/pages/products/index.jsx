import React, { useEffect, useState } from 'react'

import {Container, Row, Col, Card} from 'react-bootstrap';
import Header from '../../components/header';
import {url} from '../../utils/constants';

import toast, { Toaster } from 'react-hot-toast';

import './index.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        listProducts();
    }, []);

    const listProducts = () => {
        fetch(url + '/products',{
            method : 'GET',
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.status === "500"){
                    toast.error('There was an error: ' + data.message);
                    return;
                }

                setProducts(data)
            })
            .catch(err => console.error(err));
    }

    return (
         <div>
            <Toaster />
            <Header />
                <Container>
                    <Row className='productsRow'>
                        {
                            products.length > 0 ?
                            products.map((item, index) => {
                                return (
                                    <Col xs='4' key={index} style={{ marginTop: '20px' }} className='product'>
                                        <Card style={{ width: '65%' }} className='productCard'>
                                        <Card.Img variant="top" src={item.imageUrl} />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                        </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                            :
                            <h3>There are no products at the moment...</h3>
                        }
                    </Row>
                </Container>
            
         </div>
     )

}

export default Products;