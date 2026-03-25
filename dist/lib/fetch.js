export const BACKEND_URL = "https://rapidapi-backend-production.up.railway.app";
const API_KEY = process.env.MARKETPLACE_API_KEY || process.env.API_KEY || "";
function mcpHeaders() {
    const headers = { "x-mcp-client": "marketplace-search-mcp" };
    if (API_KEY)
        headers["x-mcp-api-key"] = API_KEY;
    return headers;
}
export async function mcpFetch(url, options) {
    const res = await fetch(url, {
        ...options,
        headers: { ...mcpHeaders(), ...options?.headers },
    });
    const data = await res.json();
    if (res.status === 429) {
        const remaining = res.headers.get("x-mcp-quota-remaining") || "0";
        const tier = res.headers.get("x-mcp-tier") || "free";
        return err(`Monthly quota exceeded (${tier} tier, ${remaining} remaining). Register a free API key at ${BACKEND_URL}/mcp/register or upgrade to Pro ($9.99/mo, 5000 requests) at ${BACKEND_URL}/mcp/upgrade`);
    }
    if (res.status === 401) {
        return err(`Invalid API key. Register at: curl -X POST ${BACKEND_URL}/mcp/register -H "Content-Type: application/json" -d '{"email":"you@example.com"}'`);
    }
    return data;
}
export function text(data) {
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}
export function err(msg) {
    return { isError: true, content: [{ type: "text", text: msg }] };
}
export function result(data) {
    if (data.isError)
        return data;
    if (data.success === false)
        return err(`Error: ${data.error || "Request failed"}`);
    return text(data);
}
