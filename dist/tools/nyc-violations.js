import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerNycViolations(server) {
    server.tool("search_nyc_violations", "Search NYC Department of Buildings violation records by address, BIN, or block+lot. Covers DOB Violations, Safety Violations, and ECB Violations (with penalty amounts). Use summary=true for aggregate stats.", {
        house_number: z.string().optional().describe('House number (e.g. "350"). Use with street.'),
        street: z.string().optional().describe('Street name (e.g. "BROADWAY"). Use with house_number.'),
        bin: z.string().optional().describe("NYC BIN (Building Identification Number)"),
        block: z.string().optional().describe("Tax block number (use with lot)"),
        lot: z.string().optional().describe("Tax lot number (use with block)"),
        borough: z.string().optional().describe('Borough: manhattan, bronx, brooklyn, queens, or "staten island"'),
        summary: z.boolean().default(false).describe("Set true for aggregate stats instead of individual violations"),
        limit: z.number().int().min(1).max(100).default(20).describe("Max results (ignored when summary=true)"),
    }, async ({ house_number, street, bin, block, lot, borough, summary, limit }) => {
        const params = new URLSearchParams();
        if (house_number)
            params.set("house_number", house_number);
        if (street)
            params.set("street", street);
        if (bin)
            params.set("bin", bin);
        if (block)
            params.set("block", block);
        if (lot)
            params.set("lot", lot);
        if (borough)
            params.set("borough", borough);
        if (!summary)
            params.set("limit", String(limit));
        const endpoint = summary ? "summary" : "search";
        return result(await mcpFetch(`${BACKEND_URL}/nyc-violations/${endpoint}?${params.toString()}`));
    });
}
