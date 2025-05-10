import type { CartItem, Product } from "../App";
import { Link } from "react-router-dom";

type Prop = {
    cart: CartItem[];
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (product: Product) => void;
}

export function getNumericPrice(item: CartItem): number {
    return item.product.price.main + item.product.price.fractional / 100;
}

function Cart({cart, onAddToCart, onRemoveFromCart}: Prop) {
    const total = cart.reduce((acc, item) => acc + getNumericPrice(item) * item.quantity, 0);

    return (
        <div>
            <Link to="/">Home</Link>
            <h2>Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.product.id}>
                        {item.product.name} x {item.quantity}: {(getNumericPrice(item)*item.quantity).toFixed(2)}
                        <button onClick={() => onAddToCart(item.product)}>
                            +
                        </button>
                        <button onClick={() => onRemoveFromCart(item.product)}>
                            -
                        </button>
                    </li>
                ))}
            </ul>
            <p><strong>Total: {total.toFixed(2)}</strong></p>
            {cart.length > 0 && (
                <Link to="/checkout">
                    <button>Checkout</button>
                </Link>
            )}
        </div>
    );
};

export default Cart;