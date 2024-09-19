import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar } from './components/layout';
import { Footer } from './components/layout';
import Home from './pages/Home'

function App(){
  return(
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

