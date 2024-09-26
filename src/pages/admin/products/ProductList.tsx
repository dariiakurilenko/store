import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import Product  from '../../../interfaces'


type SortOrder = 'asc' | 'desc';

export default function ProductList(){
    const [value, setValue] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const itemsPerPage = 10;
    function getProducts(currentPage: number, sortOrder: SortOrder = 'asc'){
        fetch(`http://localhost:3004/products?_page=${currentPage}&_limit=${itemsPerPage}&_sort=price&_order=${sortOrder}`)
        .then(response => {
            if(response.ok){
                const totalCount = response.headers.get('X-Total-Count');
                setTotalPages(Math.ceil(Number(totalCount) / itemsPerPage));
                return response.json()
            }
            throw new Error()
        })
        .then(data => {
            setProducts(data)
        })
        .catch(err => {
            console.error('Ошибка при получении данных:', err);
            alert('Unable to get the data')
        })
    }

    useEffect(() => {
        getProducts(currentPage, sortOrder);
    }, [currentPage, sortOrder]);

    function deleteProduct(id: number){
        fetch("http://localhost:3004/products/" + id, {
            method: "DELETE"
        })
        .then(response => {
            if(!response.ok){
                throw new Error()
            }
            getProducts(currentPage, sortOrder)
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
            alert('Unable to delete the product')
        })
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(value.toLowerCase())
    )
    const handleSortChange = (order: SortOrder) => {
        setSortOrder(order);
        getProducts(currentPage, order);
    };
    const handleRefresh = () => {
        getProducts(currentPage, sortOrder);
    };
    return (
        <div className="container my-4 mx-3">
            <h2 className="text-center mb-4 text-primary">Products</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/admin/products/create" role='button'>Create Product</Link>
                    <button type='button' className="btn btn-outline-primary" onClick={handleRefresh}>Refresh</button>
                    
                </div>
                <div className="col">
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <select onChange={(e) => handleSortChange(e.target.value as 'asc' | 'desc')} className="form-select">
                        <option value="asc">sort by descending price</option>
                        <option value="desc">sort by ascending price</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {
                    filteredProducts.map((product, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card" style={{ height: '600px', borderRadius: '15px', overflow: 'hidden' }}>
                                <img src={product.url} className="card-img-top" alt={product.name} style={{ height: '400px', width: '400px', objectFit: 'contain' }}/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.price}$</p>
                                    <div mt-auto>
                                    <Link to={`/admin/products/${product.id}`} className="btn btn-primary mr-5">View</Link>
                                    <Link className='btn btn-secondary btn-sm me-1 ms-2' to={'/admin/products/edit/' + product.id}>Edit</Link>
                                    <button type='button' className='btn btn-danger btn-sm' onClick={() => deleteProduct(product.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        
    
       
        


        
    
            <nav aria-label='Page navigation'>
                <ul className='pagination justify-content-center'>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className='page-link' onClick={() => setCurrentPage(prev => Math.max(prev-1, 1))}>Previous</button>
                    </li>
                    {Array.from({length: totalPages}, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}