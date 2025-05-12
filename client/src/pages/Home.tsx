import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/format';
import { categories } from '../data/mockCategories';
import img from '../assets/product-placeholderfeatured.svg'

const Home = () => {
    return (
        <div className="col-12">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="display-5 fw-bold">Welcome to Knightly Store</h1>
                <p className="lead text-muted">
                    Browse premium products, shop by category, and enjoy a smooth checkout experience.
                </p>
                <Link to="/products" className="btn btn-secondary btn-lg mt-3">
                    Start Shopping
                </Link>
            </div>

            {/* Featured Sections */}
            <div className="row g-4 mb-5">
                {categories.map((i) => (
                    <div className="col-md-4" key={i}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={img}
                                className="card-img-top img-fluid"
                                style={{ height: '200px', objectFit: 'cover' }}
                                alt={`Featured ${i} Img`}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Featured {i} Products</h5>
                                <p className="card-text">Explore products in this category.</p>
                                <Link to={`/products/${slugify(i)}`} className="btn btn-outline-secondary mt-auto">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="bg-light p-5 rounded text-center">
                <h3 className="mb-3">Get 10% Off Your First Order</h3>
                <p className="mb-4 text-muted">Sign up to receive exclusive offers and updates.</p>
                <Link to="/login" className="btn btn-success btn-lg">
                    Create Account
                </Link>
            </div>
        </div>
    );
};

export default Home;