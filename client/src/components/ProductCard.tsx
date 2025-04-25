import React from 'react';
import { ProductData } from '../types/product';
import img from '../assets/150x200.svg'
import { formatCurrency } from '../utils/format';

function ProductCard({ product }: ProductCardProps) {
    return (
        <div className='card m-3 my-2' style={{ width: '200px' }}>
            <img className="card-img-top" src={img} alt="" />
            <div className='card-body d-flex flex-column justify-content-between' style={{ height: '130px' }}>
                <div>
                    <div className='card-text text-truncate' style={{ fontSize: '1.1rem' }}>{product.name}</div>
                    <div className='text-muted' style={{ fontSize: '0.85rem' }}>Rating: [rating]</div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='card-text'>{formatCurrency(product.price, false)}</div>
                    <div className='card-text align-items-center'><button className='btn'>+</button></div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;

interface ProductCardProps {
    product: ProductData;
}