import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductsFilter from '../components/ProductsFilter';
import { getBreadcrumb } from '../utils/breadcrumb';
import { unslugify } from '../utils/format';
import { useDispatch } from 'react-redux';
import { ProductData } from '../types/product';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const bcSegments = ['Products'];
const BASE_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL;

const Products = () => {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/products`);
                if (!res) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const preFilterProducts = ():ProductData[] => {
        if (products) {
            const snakeCatName = categoryName?.replace(/-/g, '_');
            return snakeCatName ? products.filter((p) => p.category.name === snakeCatName) : products;
        }
        return [];
    }

    const handleAddToCart = (product: ProductData) => {
        dispatch(addToCart(product));
    };

    const filterProducts = (products: ProductData[]) => {
        return products.filter((p) => selectedFilters.every(tag => p.category.tags.includes(tag)));
    };

    if (loading) {
        return (
            <div className='row mx-auto' style={{ maxWidth: '1200px', height: '75vh' }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (<>Error</>);
    }

    return (
        <>
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
                <ProductsFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </div>
            <div className='col p-0'>
                <div className="row">
                    {filterProducts(preFilterProducts()).map((p) => (
                        <div className='col-auto p-0' key={p._id}>
                            <ProductCard product={p} onAddToCart={handleAddToCart} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Products;