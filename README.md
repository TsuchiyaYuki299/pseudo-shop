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

## 🐳 ローカル開発環境の構築 (Docker)

ホスト環境（ローカルPC）をクリーンに保つため、コンテナを使った隔離環境での開発をサポートしています。

### 起動方法

1. Docker Desktop等が起動していることを確認します。
2. ターミナルで本プロジェクトのディレクトリを開き、以下のコマンドを実行します。

```bash
docker-compose up --build
```

### サーバーへのアクセス

Dockerを立ち上げると、コンテナ内のサーバーにホストOSからアクセスできるようになります。

- **Vite 開発サーバー（通常のUI確認）**: `http://localhost:5173`
- **Wrangler シミュレーション**: `http://localhost:8788` （※コンテナ内で `npm run preview` を実行した場合）

> [!NOTE]
> `node_modules`はコンテナ内部で独立して保持されるように設定しているため、Windowsなどのホスト環境とLinux（Docker）環境の間でバイナリ（esbuild等）の互換性エラーが発生することを防ぎます。
