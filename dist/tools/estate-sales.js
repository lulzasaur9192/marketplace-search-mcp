import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerEstateSales(server) {
    server.tool("search_estate_sales", "Search for estate sales by ZIP code or city/state. Find upcoming and active estate sales with dates, addresses, descriptions, and photos from EstateSales.net.", {
        zip: z.string().optional().describe('ZIP code (e.g. "90210")'),
        city: z.string().optional().describe('City name (e.g. "Los Angeles")'),
        state: z.string().optional().describe('State abbreviation (e.g. "CA")'),
        limit: z.number().int().min(1).max(50).default(20).describe("Max results (max 50)"),
    }, async ({ zip, city, state, limit }) => {
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        if (zip)
            params.set("zip", zip);
        if (city)
            params.set("city", city);
        if (state)
            params.set("state", state);
        return result(await mcpFetch(`${BACKEND_URL}/estate-sales/search?${params.toString()}`));
    });
    server.tool("estate_sale_details", "Get full details of a specific estate sale including photos, items, dates, directions, and sale company info.", {
        sale_id: z.string().optional().describe("Estate sale ID"),
        url: z.string().optional().describe("EstateSales.net URL for the sale"),
    }, async ({ sale_id, url }) => {
        const params = new URLSearchParams();
        if (sale_id)
            params.set("sale_id", sale_id);
        if (url)
            params.set("url", url);
        return result(await mcpFetch(`${BACKEND_URL}/estate-sales/details?${params.toString()}`));
    });
}
