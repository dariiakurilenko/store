import { Link, useNavigate } from "react-router-dom";
import React from "react";

const CreateProduct: React.FC = () =>{
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: any } = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        const jsonData = JSON.stringify(data);
        try{
            const response = await fetch('http://localhost:3004/products', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData
            })
            if (response.ok){
                const createdProduct = await response.json();
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate(`/admin/products/${createdProduct.id}`);
                }, 2000)
            }else if(response.status === 400){
                alert('Validation errors')
            }else{
                alert('Unable to create the product')
            }
        }
        catch(error){
            console.error('Ошибка при получении данных:', error); 
            alert('Unable to connect to the server')
        }
    }
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" required/>
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="brand" required/>
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
                                <input className="form-control" name="price" type='number' min="1" step='0.01' required/>
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8"><input className="form-control" name="description" required />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image-URL</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="url" required/>
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
                </div>
            </div>
            {showSuccessModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">success!</h5>   
                            </div>
                            <div className="modal-body">
                                <p>Successfully added!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateProduct