import type { CartItem, Product } from "../App";

type Prop = {
    cart: CartItem[];
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (product: Product) => void;
}

function getNumericPrice(item: CartItem): number {
    return item.product.price.main + item.product.price.fractional / 100;
}

function Cart({cart, onAddToCart, onRemoveFromCart}: Prop) {
    const total = cart.reduce((acc, item) => acc + getNumericPrice(item) * item.quantity, 0);

    return (
        <div>
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
        </div>
    );
};

export default Cart;