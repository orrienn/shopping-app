import type { CartItem } from "../App";

type Prop = {
    cart: CartItem[];
    onRemoveFromCart: (id: number) => void;
}

function getNumericPrice(item: CartItem): number {
    return item.product.price.main + item.product.price.fractional / 100;
}

function Cart({cart, onRemoveFromCart}: Prop) {
    const total = cart.reduce((acc, item) => acc + getNumericPrice(item) * item.quantity, 0);

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.product.id}>
                        {item.product.name} - {item.quantity} - {getNumericPrice(item)}
                        <button onClick={() => onRemoveFromCart(item.product.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <p><strong>Total: {total}</strong></p>
        </div>
    );
};

export default Cart;