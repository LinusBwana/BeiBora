import React, { useState, useEffect} from 'react';
import {Container, Card, Button, Spinner, Alert} from 'react-bootstrap';
import productService from '../services/productService';

function Homepage () {
    const [priceRange, setPriceRange] = useState(500);
    // State to store products
    const [products, setProducts] = useState([]);
    // State for loading
    const [loading, setLoading] = useState(true);
    // State for errors
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts(); // Empty array means run once when component loads
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data.results || data);
        } catch (err) {
            console.error(err);
            setError('Failed to load products');
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

    const categories = [
        { name: 'All Products', icon: 'fa-tags', count: 248 },
        { name: 'Clothing', icon: 'fa-tshirt', count: 86 },
        { name: 'Footwear', icon: 'fa-shoe-prints', count: 42 },
        { name: 'Accessories', icon: 'fa-watch', count: 35 },
        { name: 'Electronics', icon: 'fa-mobile-alt', count: 28 },
        { name: 'Home & Garden', icon: 'fa-home', count: 54 },
        { name: 'Books', icon: 'fa-book', count: 19 },
        { name: 'Sports', icon: 'fa-dumbbell', count: 31 },
        { name: 'Kids', icon: 'fa-baby', count: 22 },
        { name: 'Beauty', icon: 'fa-spa', count: 17 },
        { name: 'Food & Drinks', icon: 'fa-utensils', count: 14 },
    ];


    return (
        <div className="homepage">
        
        {/* Hero Section */}
        <section className="hero-section">
            <div className="container-xl">
            <div className="row align-items-center">
                <div className="col-lg-6">
                <h1 className="hero-title">
                    Discover <span className="text-accent">Premium</span><br />
                    Products Today
                </h1>
                <p className="hero-subtitle mt-3">
                    Curated collections designed to elevate your everyday life. 
                    Quality meets style in every piece.
                </p>
                <a href="/shop" className="btn btn-hero mt-3">
                    Shop Now <i className="fas fa-arrow-right ms-2"></i>
                </a>
                </div>
            </div>
            </div>
        </section>

        {/* Stats Strip */}
        <div className="stats-strip">
            <div className="container-xl">
            <div className="d-flex justify-content-center flex-wrap gap-4">
                <div className="stat-item">
                <i className="fas fa-truck"></i> Free shipping on orders over $50
                </div>
                <div className="stat-item">
                <i className="fas fa-percent"></i> Up to 40% off selected items
                </div>
                <div className="stat-item">
                <i className="fas fa-bolt"></i> New arrivals every Monday
                </div>
                <div className="stat-item">
                <i className="fas fa-star"></i> 4.9★ average rating
                </div>
            </div>
            </div>
        </div>

        {/* Main Content - Sidebar + Products */}
        <div className="container-xl py-4">
            <div className="row g-4">
            
            {/* Sidebar - Categories */}
            <aside className="col-lg-3">
                <div className="sidebar-card">
                <h5 className="sidebar-title">
                    <i className="fas fa-list me-2"></i>Categories
                </h5>
                <ul className="category-list">
                    {categories.map((cat, idx) => (
                    <li key={idx}>
                        <a href="#" className={idx === 0 ? 'active' : ''}>
                        <i className={`fas ${cat.icon} category-icon`}></i>
                        <span>{cat.name}</span>
                        <span className="category-count">{cat.count}</span>
                        </a>
                    </li>
                    ))}
                </ul>

                {/* Price Filter */}
                <div className="mt-4">
                    <h5 className="sidebar-title">
                    <i className="fas fa-dollar-sign me-2"></i>Price Range
                    </h5>
                    <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">$0</span>
                    <span className="text-muted small">$500</span>
                    </div>
                    <input 
                    type="range" 
                    className="form-range price-range" 
                    min="0" 
                    max="500" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <div className="text-center mt-2">
                    <span className="text-accent fw-bold">Max: Ksh{priceRange}</span>
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="mt-4">
                    <h5 className="sidebar-title">
                    <i className="fas fa-star me-2"></i>Rating
                    </h5>
                    <ul className="category-list">
                    <li>
                        <a href="#">
                        <div className="d-flex align-items-center gap-1">
                            {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-accent small"></i>)}
                            <span className="ms-1">& up</span>
                        </div>
                        <span className="category-count">56</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <div className="d-flex align-items-center gap-1">
                            {[...Array(4)].map((_, i) => <i key={i} className="fas fa-star text-accent small"></i>)}
                            <span className="ms-1">& up</span>
                        </div>
                        <span className="category-count">94</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <div className="d-flex align-items-center gap-1">
                            {[...Array(3)].map((_, i) => <i key={i} className="fas fa-star text-accent small"></i>)}
                            <span className="ms-1">& up</span>
                        </div>
                        <span className="category-count">138</span>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </aside>

            {/* Main Content - Products */}
            <main className="col-lg-9">
                
                {/* Top Bar - Results & Sort */}
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <p className="mb-0 text-muted">
                    Showing <strong className="text-light">1 – 9</strong> of <strong className="text-light">248</strong> products
                </p>
                <select className="form-select sort-select">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Most Popular</option>
                    <option>Top Rated</option>
                </select>
                </div>


                {/* Product Grid */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                    
                    <Card className="product-card h-100">
                        
                        {/* Image */}
                        <div className="product-img">
                        <Card.Img
                            src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                            alt={product.name}
                        />
                        <button className="wishlist-btn">
                            <i className="far fa-heart"></i>
                        </button>
                        </div>

                        {/* Body */}
                        <Card.Body className="product-body d-flex flex-column">
                            <h6 className="product-name">
                                {product.name}
                            </h6>

                            <h5 className="product-category-name">
                                {product.category?.name}
                            </h5>

                            <div className="product-price">
                                <span className="product-price">
                                Ksh {product.price}
                                </span>
                            </div>

                            <Button
                                className="btn-add-cart w-100 mt-2"
                            >
                                <i className="fas fa-shopping-cart me-2"></i>
                                Add to Cart
                            </Button>
                        </Card.Body>



                    </Card>

                    </div>
                ))}
                </div>

                {/* Brands Strip */}
                <div className="brands-strip mt-4">
                <h6 className="mb-3">Trusted Brands</h6>
                <div className="d-flex justify-content-around flex-wrap gap-3">
                    {['Nike', 'Adidas', 'Apple', 'Sony', "Levi's", 'Dyson', 'Zara', 'H&M'].map((brand, idx) => (
                    <span key={idx} className="brand-item">{brand}</span>
                    ))}
                </div>
                </div>
            </main>

            </div>
        </div>

        </div>
    );
};

export default Homepage;