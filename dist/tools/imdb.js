import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerImdb(server) {
    server.tool("search_imdb", "Search IMDb for movies and TV shows. Can search by title or browse curated charts (Top 250 Movies, Top 250 TV, Most Popular Movies, Most Popular TV). Returns ratings, year, cast, and IMDb links.", {
        query: z
            .string()
            .optional()
            .describe('Movie or TV show title to search (e.g. "inception", "breaking bad")'),
        chart: z
            .enum(["top", "toptv", "moviemeter", "tvmeter"])
            .optional()
            .describe("IMDb chart: top (Top 250 Movies), toptv (Top 250 TV), moviemeter (Most Popular Movies), tvmeter (Most Popular TV)"),
        limit: z
            .number()
            .int()
            .min(1)
            .max(50)
            .default(20)
            .describe("Number of results (max 50)"),
    }, async ({ query, chart, limit }) => {
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        if (query)
            params.set("query", query);
        if (chart)
            params.set("chart", chart);
        return result(await mcpFetch(`${BACKEND_URL}/imdb/search?${params.toString()}`));
    });
}
