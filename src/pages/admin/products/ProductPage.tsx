import React from 'react';
import { useParams } from 'react-router-dom';
import Product  from '../../../interfaces'

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = React.useState<Product | null>(null);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        const fetchProduct = async() => {
            try{
                const response = await fetch(`http://localhost:3004/products/${id}`);
                if (!response.ok){
                    throw new Error('Unable to get data about the product');
                }
                const data: Product = await response.json();
                setProduct(data)
            }catch(error){
                alert('Unable to get data')
            }finally{
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!product) {
        return <div>No product found</div>;
    }
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ height: '500px', width: '700px' }}>
                    <img src={product.url} className="img-fluid border rounded shadow" alt="Product Image" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center" style={{ height: '400px', width: '300px' }}>
                    <h1 className="text-primary">{product.name}</h1>
                    <p className="font-weight-bold text-secondary">Brand: {product.brand}</p>
                    <p className="text-success h5">Price: {product.price}$</p>
                    <p className="text-muted">{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
