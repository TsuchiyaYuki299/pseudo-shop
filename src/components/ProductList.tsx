import type { Product } from '../types';

interface Props {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2">{product.name}</h2>
                        <p className="text-xs text-gray-500 mb-4 h-8">{product.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">
                                ¥{product.price.toLocaleString()}
                            </span>
                            <button
                                onClick={() => onAddToCart(product)}
                                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2 px-4 rounded transition-colors"
                            >
                                カートに入れる
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}