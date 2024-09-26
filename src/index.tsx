import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar } from './components/layout';
import { Footer } from './components/layout';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';
import ProductPage from './pages/admin/products/ProductPage';
import ProfilePage from './pages/ProfilePage'

function App(){
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/admin/products' element={<ProductList />}/>
        <Route path='/admin/products/create' element={<CreateProduct />}/>
        <Route path='/admin/products/edit/:id' element={<EditProduct />}/>
        <Route path='/admin/products/:id' element={<ProductPage />} />
        <Route path='/admin/profile' element={<ProfilePage />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}


const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Element with id 'root' not found.");
}


