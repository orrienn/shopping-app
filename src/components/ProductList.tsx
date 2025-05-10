import type { Product } from "../App";

type Prop = {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

function ProductList({products, onAddToCart}: Prop) {

    const formatPrice = (p: Product): string =>
        `${p.price.main},${p.price.fractional}`;

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {formatPrice(product)}
                        <button onClick={() => onAddToCart(product)}>
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;