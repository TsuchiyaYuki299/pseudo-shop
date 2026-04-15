interface Env {
  // wrangler.jsoncで定義したバインディング名と合わせる
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    // データベースからすべての商品を取得
    const { results } = await context.env.DB.prepare('SELECT * FROM products').all();

    // React側の Product 型に合わせた形式へ変換
    const formattedProducts = results.map((row: any) => ({
      id: String(row.id),   // React側は string として扱っているため変換
      name: row.name,
      description: row.description,
      price: row.price,
      // JS側はキャメルケースなので変換
      imageUrl: row.image_url,
      imageUrlMobile: row.image_url_mobile || undefined
    }));

    // JSONとしてフロントエンドに返す
    return Response.json(formattedProducts);
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
