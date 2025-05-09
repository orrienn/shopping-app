import { useState, useEffect } from 'react';

type Product = {
    id: number;
    name: string;
    price: {
        main: number;
        fractional: number;
    };
};

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("/products.json")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }, []);

    const formatPrice = (p: Product): string =>
        `${p.price.main},${p.price.fractional}`;

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - {formatPrice(p)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;