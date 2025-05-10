import type { CartItem } from "../App";
import { getNumericPrice } from "./Cart";
import { Link } from "react-router-dom";

type Props = {
    cart: CartItem[];
}

function Checkout({ cart }: Props) {
    const total = cart.reduce((acc, item) => acc + getNumericPrice(item) * item.quantity, 0);

    const handleSubmit = () => {
        window.location.href = "/order-success.html";
    };
    
    return (
        <div>
            <h2>Podsumowanie Zamówienia</h2>
            {cart.map((item) => (
                <li key={item.product.id}>
                    {item.product.name} x {item.quantity}: {(getNumericPrice(item)*item.quantity).toFixed(2)}
                </li>
            ))}
            <p><strong>Suma: {total.toFixed(2)}</strong></p>
            <Link to="/cart">
                <button>Back to Cart</button>
            </Link>
            <button onClick={handleSubmit}>
                Złóż zamówienie
            </button>
        </div>
    );
};

export default Checkout;