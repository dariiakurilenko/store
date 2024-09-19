import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar } from './components/layout';
import { Footer } from './components/layout';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductList from './pages/admin/products/ProductList';

function App(){
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/admin/products' element={<ProductList />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

