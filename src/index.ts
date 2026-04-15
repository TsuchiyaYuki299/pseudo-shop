export interface Env {
  DB: D1Database;
  // ASSETS: Fetcher; // V4以降はデフォルトでAssetsルーティングが行われるため不要
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // APIルートのハンドリング
    if (url.pathname === '/api/products') {
      try {
        const { results } = await env.DB.prepare('SELECT * FROM products').all();
        
        const formattedProducts = results.map((row: any) => ({
          id: String(row.id),
          name: row.name,
          description: row.description,
          price: row.price,
          imageUrl: row.image_url,
          imageUrlMobile: row.image_url_mobile || undefined
        }));

        return Response.json(formattedProducts);
      } catch (error) {
        console.error('API Error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    }

    // フロントエンド用のアセットがAssets経由でヒットしなかった場合（ナビゲーションなど）
    // Wrangler v3.8+ / Workers with Assets では、WorkerがResponseを返さなければ
    // 自動的に静的アセット（SPAフォールバックなど）の処理にフォールバックされます。
    // （※TypeScriptの型定義上、Responseを返す必要があるため、見つからなかった場合は404を返します。
    //   実際には、`not_found_handling: "single-page-application"` により index.html が表示されます）
    return new Response('Not Found', { status: 404 });
  }
};
