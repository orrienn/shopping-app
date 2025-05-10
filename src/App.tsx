import { useState, useEffect } from 'react'
import './App.css'
import ProductList from './components/ProductList';
import Cart from './components/Cart';

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

  return (
    <div>
      <h1>Shop</h1>
      <ProductList products={products} onAddToCart={addToCart} />
      <Cart cart={cart} onRemoveFromCart={() => true} />
    </div>
  );
}

export default App;
