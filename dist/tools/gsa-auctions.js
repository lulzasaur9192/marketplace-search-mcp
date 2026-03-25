import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerGsaAuctions(server) {
    server.tool("search_gsa_auctions", "Search US government surplus auctions from GSA (General Services Administration). Find vehicles, electronics, equipment, and more at below-market prices.", {
        query: z.string().optional().describe('Search term (e.g. "computer", "vehicle", "furniture")'),
        state: z.string().optional().describe('State filter (e.g. "CA", "TX")'),
        agency: z.string().optional().describe('Agency filter (e.g. "DoD", "GSA")'),
        status: z.enum(["active", "preview"]).optional().describe("Auction status filter"),
        min_bid: z.number().optional().describe("Minimum bid amount"),
        max_bid: z.number().optional().describe("Maximum bid amount"),
        limit: z.number().int().min(1).max(50).default(20).describe("Max results (max 50)"),
        offset: z.number().int().min(0).default(0).describe("Offset for pagination"),
    }, async ({ query, state, agency, status, min_bid, max_bid, limit, offset }) => {
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        params.set("offset", String(offset));
        if (query)
            params.set("query", query);
        if (state)
            params.set("state", state);
        if (agency)
            params.set("agency", agency);
        if (status)
            params.set("status", status);
        if (min_bid != null)
            params.set("min_bid", String(min_bid));
        if (max_bid != null)
            params.set("max_bid", String(max_bid));
        return result(await mcpFetch(`${BACKEND_URL}/gsa-auctions/search?${params.toString()}`));
    });
    server.tool("gsa_auction_details", "Get full details of a specific GSA surplus auction lot including description, bid info, location, inspection dates, and sale terms.", {
        sale_number: z.string().describe("GSA sale number"),
        lot_number: z.string().describe("Lot number within the sale"),
    }, async ({ sale_number, lot_number }) => {
        const params = new URLSearchParams();
        params.set("sale_number", sale_number);
        params.set("lot_number", lot_number);
        return result(await mcpFetch(`${BACKEND_URL}/gsa-auctions/details?${params.toString()}`));
    });
    server.tool("gsa_auction_stats", "Get aggregated statistics for GSA surplus auctions — breakdown by state, agency, status, total bid amounts, and averages.", {}, async () => {
        return result(await mcpFetch(`${BACKEND_URL}/gsa-auctions/stats`));
    });
}
