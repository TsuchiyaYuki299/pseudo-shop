import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface Props {
    onComplete: () => void;
}

export function CheckoutFlow({ onComplete }: Props) {
    const [step, setStep] = useState<'confetti' | 'modal' | 'truck'>('confetti');

    useEffect(() => {
        if (step === 'confetti') {
            // 1. 紙吹雪アニメーション
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#f97316', '#3b82f6', '#10b981', '#f59e0b']
            });

            // 2秒後にモーダルを表示
            const timer = setTimeout(() => setStep('modal'), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const startTruckAnimation = () => {
        setStep('truck');
        // トラックが走り去る時間（3秒）待ってから完了
        setTimeout(() => {
            onComplete();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            {/* 背景の半透明オーバーレイ */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* 2. 念押しメッセージモーダル */}
            {step === 'modal' && (
                <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm text-center transform animate-in fade-in zoom-in duration-300">
                    <h2 className="text-2xl font-black mb-4">購入完了！🎉</h2>
                    <p className="text-gray-700 font-bold text-lg mb-6 bg-yellow-100 p-4 rounded-md">
                        ※実際には請求されませんので<br />ご安心ください。
                    </p>
                    <button
                        onClick={startTruckAnimation}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full transition-colors"
                    >
                        配達を見送る
                    </button>
                </div>
            )}

            {/* 3. ポップなトラックアニメーション */}
            {step === 'truck' && (
                <div className="absolute bottom-1/4 left-0 animate-drive flex items-end">
                    {/* トラック本体 */}
                    <div className="w-48 h-32 bg-blue-400 rounded-xl relative shadow-lg">
                        {/* 運転席 */}
                        <div className="absolute right-[-40px] bottom-0 w-16 h-20 bg-blue-300 rounded-r-xl border-l-4 border-blue-500">
                            <div className="absolute top-2 right-2 w-10 h-10 bg-sky-200 rounded"></div>
                        </div>
                        {/* 可愛いキャラクター（Duolingo風のアウルをイメージ） */}
                        <div className="absolute right-[-25px] top-6 w-12 h-12 bg-green-400 rounded-full flex flex-col items-center justify-center border-2 border-green-600 shadow-sm z-10">
                            <div className="flex gap-1 mb-1">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </div>
                            <div className="w-3 h-2 bg-orange-400 rounded-b-full"></div>
                        </div>
                        {/* 荷台のロゴ */}
                        <div className="absolute inset-0 flex items-center justify-center text-white/50 font-black text-2xl tracking-widest">
                            Giji-Shop
                        </div>
                        {/* タイヤ */}
                        <div className="absolute bottom-[-16px] left-6 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-300"></div>
                        <div className="absolute bottom-[-16px] right-[-24px] w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-300"></div>
                    </div>
                </div>
            )}

            {/* インラインCSSでのアニメーション定義 */}
            <style>{`
        @keyframes drive {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(100vw); }
        }
        .animate-drive {
          animation: drive 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
        </div>
    );
}