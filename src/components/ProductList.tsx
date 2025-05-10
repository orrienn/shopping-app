import type { Product } from "../App";
import { Link } from "react-router-dom";

type Prop = {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

function ProductList({products, onAddToCart}: Prop) {

    const formatPrice = (p: Product): string =>
        `${p.price.main},${p.price.fractional}`;

    return (
        <div>
            <h2>Lista Produktów</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {formatPrice(product)}
                        <button onClick={() => onAddToCart(product)}>
                            Dodaj do koszyka
                        </button>
                    </li>
                ))}
            </ul>
            <Link to="/cart">Koszyk</Link>
        </div>
    );
}

export default ProductList;