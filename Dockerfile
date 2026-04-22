# Node.js 22(LTS)ベースイメージ
FROM node:22-slim

WORKDIR /app

# パッケージ定義ファイルをコピー
COPY package*.json ./

# 依存パッケージのインストール
# (Dockerコンテナ専用のLinuxベースモジュールとしてインストールします)
RUN npm install

# プロジェクトのソースコードをコピー
COPY . .

# root権限でコピー・作成したファイルの所有者を、安全なnodeユーザーに変更します
RUN chown -R node:node /app
# 実行ユーザーを root から node に切り替えます
USER node

# 開発用ポートの開放
# 5173: Vite開発サーバー
# 8788: Wranglerローカルシミュレーション
EXPOSE 5173 8788

# デフォルトの起動コマンド
CMD ["npm", "run", "dev"]
