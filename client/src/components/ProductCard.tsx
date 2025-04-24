import React from 'react';
import { ProductData } from '../types/product';
import img from '../assets/150x200.svg'
import { formatCurrency } from '../utils/format';

function ProductCard({ product }: ProductCardProps) {
    return (
        <div className='card m-3 my-2' style={{ width: '200px' }}>
            <img className="card-img-top" src={img} alt="" />
            <div className='card-body' style={{ height: '130px' }}>
                <div className='row mb-4'>
                <h5 className='card-text'>{product.name}</h5>
                <div>Rating: [rating]</div>
                </div>
                <div className='row'>
                <div className='card-text col m-0'>{formatCurrency(product.price, false)}</div>
                <div className='card-text col m-0'>+</div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;

interface ProductCardProps {
    product: ProductData;
}