import { Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

interface Props {
    items: CartItem[];
    total: number;
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onCheckout: () => void;
}

export function Cart({ items, total, onUpdateQuantity, onRemove, onCheckout }: Props) {
    if (items.length === 0) {
        return <div className="text-center py-20 text-gray-500">カートに商品は入っていません。</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold border-b pb-2">ショッピングカート</h2>
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4 items-center">
                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-gray-900 font-bold mb-2">¥{item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded">
                                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200" aria-label="数量を1減らす">-</button>
                                    <span className="px-4 py-1 font-bold">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200" aria-label="数量を1増やす">+</button>
                                </div>
                                <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`${item.name}をカートから削除する`}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full lg:w-80 bg-gray-50 p-6 rounded-lg h-fit border border-gray-200">
                <h3 className="text-lg font-bold mb-4">注文内容</h3>
                <div className="flex justify-between text-xl font-bold mb-6">
                    <span>ご請求額：</span>
                    <span className="text-orange-600">¥{total.toLocaleString()}</span>
                </div>
                <button
                    onClick={onCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded shadow-sm transition-colors"
                >
                    購入する
                </button>
            </div>
        </div>
    );
}