import { useState, useEffect } from "react";
import { ShoppingCart, Store } from "lucide-react";
import type { Product, CartItem } from "./types";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { CheckoutFlow } from "./components/CheckoutFlow";
import { AddToCartModal } from "./components/AddToCartModal";

// ダミーデータはCloudflare D1に移行したため削除

export default function App() {
  const [currentView, setCurrentView] = useState<"products" | "cart">(
    "products",
  );
  // D1から取得した商品を保存するステート
  const [products, setProducts] = useState<Product[]>([]);
  // 読み込み中かどうかを判定するステート
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  // ポップアップに表示する商品名（nullの場合はポップアップ非表示）
  const [addedProductName, setAddedProductName] = useState<string | null>(null);

  // 初回起動時にAPIから商品データを読み込む
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("商品データの取得に失敗しました:", error);
        setIsLoading(false);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // カートに追加した商品名をセットしてポップアップを表示する
    setAddedProductName(product.name);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleCheckoutComplete = () => {
    setIsCheckingOut(false);
    setCart([]);
    setCurrentView("products");
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- 【修正追加ここから】ネストした三項演算子を解消するためのレンダリング関数を追加 ---
  const renderMainContent = () => {
    // ① カート画面の表示
    if (currentView !== "products") {
      return (
        <Cart
          items={cart}
          total={cartTotal}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      );
    }

    // ② 商品画面（ローディング中）の表示
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
          {/* 簡単なローディングアニメーション */}
          <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold tracking-widest">
            商品情報を取得中...
          </p>
        </div>
      );
    }

    // ③ 商品画面（読み込み完了後）の表示
    return <ProductList products={products} onAddToCart={addToCart} />;
  };
  // --- 【修正追加ここまで】 ---

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* 真面目なECサイト風のヘッダー */}
      <header className="bg-gray-900 text-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-md">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentView("products")}
        >
          <Store size={24} />
          <h1 className="text-xl font-bold tracking-wider">Giji-Shop.jp</h1>
        </button>
        <button
          onClick={() => setCurrentView("cart")}
          className="relative p-2 hover:bg-gray-800 rounded transition-colors"
          aria-label="カートを表示する"
        >
          <ShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {/* --- 【修正変更ここから】三項演算子を削除し、作成した関数を呼び出す形に変更 --- */}
        {renderMainContent()}
        {/* --- 【修正変更ここまで】 --- */}
      </main>

      {/* カート追加ポップアップ */}
      {addedProductName && (
        <AddToCartModal
          productName={addedProductName}
          onClose={() => setAddedProductName(null)}
        />
      )}

      {/* 決済演出コンポーネント */}
      {isCheckingOut && <CheckoutFlow onComplete={handleCheckoutComplete} />}
    </div>
  );
}
