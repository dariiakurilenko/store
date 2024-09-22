import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

export default function EditProduct(){
    const params = useParams()
    const [initialData, setInitialData] = React.useState()
    const navigate = useNavigate()

    function getProduct(){
        fetch("http://localhost:3004/products/" + params.id)
        .then(response => {
            if(response.ok){
                return response.json()
            }
            throw new Error()
        })
        .then(data => {
            setInitialData(data)
        })
        .catch(error => {
            alert('Unable to read the product details')
        })
    }

    useEffect(getProduct, [])
    async function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const jsonData = JSON.stringify(data);
        try{
            const response = await fetch('http://localhost:3004/products/' + params.id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData
            })

            if (response.ok){
                navigate("/admin/products")
            }else if(response.status === 400){
                alert('Validation errors')
            }else{
                alert('Unable to update the product')
            }
        }
        catch(error){
            alert('Unable to connect to the server')
        }
    }
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Product</h2>
                    <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">ID</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" defaultValue={params.id}/>
                            </div>
                    </div>
                    {
                        initialData && 
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" defaultValue={initialData.name}/>
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="brand" defaultValue={initialData.brand}/>
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-select" name='category'>
                                <option value='other'>other</option>
                                    <option value='phones'>phones</option>
                                    <option value='computers'>computers</option>
                                    <option value='cameras'>cameras</option>
                                    <option value='TV'>TV</option>
                                    <option value='accessorises'>accessorises</option>
                                    <option value='headphones'>headphones</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type='number' min="1" step='0.01' defaultValue={initialData.price}/>
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="description" rows='4' defaultValue={initialData.description}/>
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Created At</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" defaultValue={initialData.createdAt.slice(0,10)} name="url" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="url" defaultValue={initialData.url}/>
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type='submit' className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/admin/products' role='button'>Cancel</Link>
                            </div>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </div>
    )
}