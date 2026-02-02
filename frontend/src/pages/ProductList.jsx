import { useEffect, useState } from "react";
import {Container, Row, Col, Card, Button, Spinner, Alert} from 'react-bootstrap';
import productService from '../services/productService';

function ProductList () {
    // State to store products
    const [products, setProduct] = useState([]);
    // State for loading
    const [loading, setLoading] = useState(true);
    // State for errors
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts(); // Empty array means run once when component loads
    }, []);

    const loadProducts = async () => {
        try {
            const data =  await productService.getAllProducts();

            setProduct(data.results || data);

        } catch (err){
            setError('Failed to load products. Make sure Django server is running.');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Show loading spinner
    if(loading){
    return(
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading products...</p>
        </Container>
    )
    };

     // Show error message
    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={loadProducts}>
                        Try Again
                    </Button>
                </Alert>
            </Container>
        );
    }

    // Show message if no products
    if (products.length === 0) {
        return (
            <Container className="mt-5">
                <Alert variant="info">
                    <Alert.Heading>No Products</Alert.Heading>
                    <p>No products available at the moment.</p>
                </Alert>
            </Container>
        ); 
    }

    // Show products
    return (
        <Container className="mt-4">
            <h1 className="mb-4">Our Products</h1>
            
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} lg={3} className="mb-4">
                        <Card className="h-100">
                            {/* Product Image */}
                            <Card.Img
                                variant="top"
                                src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                alt={product.name}
                                style={{ 
                                    height: '200px', 
                                    objectFit: 'cover' 
                                }}
                            />
                            
                            <Card.Body className="d-flex flex-column">
                                {/* Product Name */}
                                <Card.Title>{product.name}</Card.Title>
                                
                                <Card.Text className="mb-0 text-danger fw-bold">
                                    {product.category.name}
                                </Card.Text>
                                
                                {/* Product Description */}
                                <Card.Text className="text-muted">
                                    {product.description?.substring(0, 100)}
                                    {product.description?.length > 100 ? '...' : ''}
                                </Card.Text>
                                
                                {/* Price and Stock */}
                                <div className="mt-auto">
                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                        <h5 className="mb-0 text-primary">
                                            Ksh {product.price}
                                        </h5>
                                    </div>
                                    
                                    {/* Add to Cart Button (temporarily disabled) */}
                                    <Button 
                                        variant="primary" 
                                        className="w-100"
                                        disabled
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );

}

export default ProductList;