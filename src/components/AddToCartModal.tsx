import { useEffect } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";

interface Props {
  productName: string;
  onClose: () => void;
}

/**
 * カートに商品を追加した後に表示されるポップアップモーダル
 * - 商品名を表示して追加完了を知らせる
 * - 「買い物に戻る」ボタンでモーダルを閉じて商品一覧に戻る
 */
export function AddToCartModal({ productName, onClose }: Props) {
  // Escapeキーでもモーダルを閉じられるようにする
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    // --- 【修正ここから】ラッパーにはイベントを持たせず、ただの枠にする ---
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景用ボタン（画面全体を覆う暗い背景。クリックで閉じる） */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm cursor-default border-none"
        onClick={onClose}
        aria-label="モーダルを閉じる"
        tabIndex={-1} // Tabキーでのフォーカスは不要なため-1
      />

      {/* モーダル本体（z-10で背景より前面に出す。stopPropagationは不要に！） */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full text-center animate-[modalIn_0.3s_ease-out]">
        // --- 【修正ここまで】 ---
        {/* チェックマークアイコン */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="text-green-500" size={48} />
          </div>
        </div>
        {/* メッセージ */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          カートに入れました
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          「{productName}」をカートに追加しました
        </p>
        {/* 買い物に戻るボタン */}
        <button
          type="button" // ← ここも念のためtype="button"を付けておくとより安全です
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} />
          買い物に戻る
        </button>
      </div>
    </div>
  );
}
