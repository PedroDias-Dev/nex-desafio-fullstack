import React, { useEffect, useState } from 'react'

import {Container, Row, Col, Card} from 'react-bootstrap';
import Header from '../../components/header';
import {url} from '../../utils/constants';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        listProducts();
    }, []);

    const listProducts = () => {
        fetch(url + '/products')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data)
            })
            .catch(err => console.error(err));
    }

    return (
         <div>
            <Header />
                <Container>
                    <Row>
                        {
                            products.length > 0 ?
                            products.map((item, index) => {
                                return (
                                    <Col xs='4' key={index}>
                                        <Card style={{ width: '18rem' }}>
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