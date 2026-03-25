import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerStorage(server) {
    server.tool("search_storage", "Search self-storage facilities by city/state or ZIP code. Find storage units with pricing, sizes, and availability from SelfStorage.com.", {
        city: z.string().optional().describe('City name (e.g. "Los Angeles")'),
        state: z.string().optional().describe('State abbreviation (e.g. "CA")'),
        page: z.number().int().min(1).default(1).describe("Page number"),
        limit: z.number().int().min(1).max(50).default(20).describe("Results per page (max 50)"),
    }, async ({ city, state, page, limit }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (city)
            params.set("city", city);
        if (state)
            params.set("state", state);
        return result(await mcpFetch(`${BACKEND_URL}/storage/search?${params.toString()}`));
    });
    server.tool("storage_facility_details", "Get full details for a specific self-storage facility including unit sizes, prices, amenities, hours, and reviews.", {
        url: z.string().describe("SelfStorage.com facility URL"),
    }, async ({ url }) => {
        return result(await mcpFetch(`${BACKEND_URL}/storage/facility?url=${encodeURIComponent(url)}`));
    });
}
