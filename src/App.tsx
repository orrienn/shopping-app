import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './App.css'
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

export type Product = {
  id: number;
  name: string;
  price: {
      main: number;
      fractional: number;
  };
};

export type CartItem = {
  product: Product;
  quantity: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/products.json")
    .then((res) => res.json())
    .then((data) => setProducts(data));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.product.id == product.id);
      if(exists) {
        return prevCart.map((item) => 
          item.product.id == product.id ? {...item, quantity: item.quantity + 1} : item
        );
      }
      else {
        return [...prevCart, {product, quantity: 1}];
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.product.id == product.id);
      if(exists) {
        if(exists.quantity > 1) {
          return prevCart.map((item) =>
            item.product.id == product.id ? {...item, quantity: item.quantity - 1} : item
          );
        }
        else {
          return prevCart.filter((item) => item.product.id != product.id);
        }
      }
      else {
        return prevCart;
      }
    });
  };

  return (
    <Router>
      {/* <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
      </nav> */}
      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              products={products} 
              onAddToCart={addToCart} 
            />} 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              onAddToCart={addToCart} 
              onRemoveFromCart={removeFromCart}
            />} 
        />
        <Route
          path="/checkout"
          element={
            <Checkout 
              cart={cart}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
