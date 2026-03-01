export async function onRequest(context) {
    // 1. Get the GitHub URL the website is asking for
    const requestUrl = new URL(context.request.url);
    const targetUrl = requestUrl.searchParams.get('url');

    if (!targetUrl) {
        return new Response("Missing url parameter", { status: 400 });
    }

    // 2. Have the Cloudflare Server securely download the file
    const response = await fetch(targetUrl, {
        method: "GET",
        headers: { "User-Agent": "Cloudflare-Pages-Proxy" }
    });

    // 3. Stream the file back to your website and FORCE the CORS approval!
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');

    return newResponse;
}
