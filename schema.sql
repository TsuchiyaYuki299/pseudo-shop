-- 商品テーブルの作成
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- 商品を一意に識別するID
  name TEXT NOT NULL,                   -- 商品名（例：ドラえもんのどこでもドア）
  description TEXT,                     -- 商品の説明文
  price INTEGER NOT NULL,               -- 価格（円単位）
  image_url TEXT,                       -- 商品画像のパス（R2のパブリックURLなど）
  image_url_mobile TEXT                 -- モバイル用画像（あれば）
);

-- 初期のダミーデータを投入（動作確認用）
-- ここにある画像パス（/door_pc.avifなど）は、R2のパブリックURLが用意でき次第、そのURLに書き換えてください。
INSERT INTO products (name, description, price, image_url, image_url_mobile) VALUES
  ('ドラえもんのどこでもドア', '空間を繋ぐ夢のドア。※設置工事費別', 980000000, 'https://pub-77c047b2e60846d0ab0592e0143cd863.r2.dev/door_pc.avif', 'https://pub-77c047b2e60846d0ab0592e0143cd863.r2.dev/door_mobile.avif'),
  ('東京都庁（第一本庁舎）', '新宿区西新宿にある超高層ビル。', 156900000000, 'https://pub-77c047b2e60846d0ab0592e0143cd863.r2.dev/tokyo.avif', NULL),
  ('月への旅行チケット（ペア）', '往復の宇宙船チケット。※宇宙食はオプションです', 25000000000, 'https://pub-77c047b2e60846d0ab0592e0143cd863.r2.dev/moon_pc.avif', 'https://pub-77c047b2e60846d0ab0592e0143cd863.r2.dev/moon_mobile.avif');
