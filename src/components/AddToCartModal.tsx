import { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

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
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        // オーバーレイ（背景の暗い部分）をクリックしても閉じる
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* モーダル本体 - クリックイベントの伝播を止めて、モーダル内クリックで閉じないようにする */}
            <div
                className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full text-center animate-[modalIn_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
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
