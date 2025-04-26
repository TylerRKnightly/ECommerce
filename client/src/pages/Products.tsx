import React from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import ProductsFilter from '../components/ProductsFilter';
import { getBreadcrumb } from '../utils/breadcrumb';
import { unslugify } from '../utils/format';
import { useDispatch } from 'react-redux';
import { ProductData } from '../types/product';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const Products = () => {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const bcSegments = ['Products'];

    const getProducts = () => {
        const snakeCatName = categoryName?.replace(/-/g, '_');
        return snakeCatName ? mockProducts.filter(p => p.category.name === snakeCatName) : mockProducts;
    }

    const handleAddToCart = (product: ProductData) => {
        dispatch(addToCart(product));
    };

    return (
        <div className='row mx-auto' style={{ maxWidth: '1200px' }}>
            <ol className='breadcrumb mx-3'>
                <li className='breadcrumb-item' key={'home'}>
                    <Link to='/' className='text-decoration-none text-muted'>Home</Link>
                </li>
                {getBreadcrumb(bcSegments)}
                <li className="breadcrumb-item active" aria-current="page" key={categoryName}>
                    {(categoryName && unslugify(categoryName)) || 'All'}
                </li>
            </ol>
            <div className='col-auto p-3'>
                <ProductsFilter />
            </div>
            <div className='col p-0'>
                <div className="row">
                    {getProducts().map((p) => (
                        <div className='col-auto p-0' key={p._id}>
                            <ProductCard product={p} onAddToCart={handleAddToCart} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;