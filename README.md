# Giji-Shop (疑似ショッピングサイト)

https://pseudo-shop.tsuchiyayuki299.workers.dev/

お金を使わずに買い物のカタルシスを得るための、完全無料の疑似ショッピングサイトです。

実際には決済されず、商品も届きません。「ドラえもんのどこでもドア」や「東京都庁」といった非現実的な商品をカートに入れ、購入ボタンを押すことで、紙吹雪とポップなトラックのアニメーションによる爽快な購入体験だけを味わうことができます。

## ✨ 機能 (Features)

* **ショッピング機能:** 架空の商品の閲覧、カートへの追加、数量変更、削除機能。
* **カタルシス演出（決済アニメーション）:** * 購入完了時の画面いっぱいの紙吹雪（`canvas-confetti`）
    * 「※実際には請求されませんのでご安心ください」の念押しモーダル
    * CSSアニメーションを活用した、トラックが画面を横切るポップな走行演出
* **レスポンシブUI:** 大手ECサイトを意識した、真面目でお堅いモバイルファーストデザイン。

## 🛠 技術スタック (Tech Stack)

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **Animations:** canvas-confetti, Tailwind CSS (Custom Keyframes)
* **Deployment:** Cloudflare Workers (Static Assets)

