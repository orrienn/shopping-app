import type { CartItem } from "../App";
import { getNumericPrice } from "./Cart";
import { Link } from "react-router-dom";

type Props = {
    cart: CartItem[];
}

function Checkout({ cart }: Props) {
    const total = cart.reduce((acc, item) => acc + getNumericPrice(item) * item.quantity, 0);
    return (
        <div>
            <h2>Checkout</h2>
            <p>Your order:</p>
            {cart.map((item) => (
                <li key={item.product.id}>
                    {item.product.name} x {item.quantity}: {(getNumericPrice(item)*item.quantity).toFixed(2)}
                </li>
            ))}
            <p><strong>Total: {total.toFixed(2)}</strong></p>
            <Link to="/cart">
                <button>Back to Cart</button>
            </Link>
        </div>
    );
};

export default Checkout;