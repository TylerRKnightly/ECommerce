import React from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import ProductsFilter from '../components/ProductsFilter';
import { getBreadcrumb } from '../utils/breadcrumb';
import { unslugify } from '../utils/format';

const Products = () => {
    const { categoryName } = useParams();
    const bcSegments = ['Products']

    const getProducts = () => {
        const snakeCatName = categoryName?.replace(/-/g, '_');
        return snakeCatName ? mockProducts.filter(p => p.category.name === snakeCatName) : mockProducts;
    }

    return (
        <div className='row mx-auto' style={{ maxWidth: '1200px' }}>
            <ol className='breadcrumb mx-3'>
                {getBreadcrumb(bcSegments)}
                <li className="breadcrumb-item active" aria-current="page">
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
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;