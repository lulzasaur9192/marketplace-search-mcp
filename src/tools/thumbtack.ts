import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";

export function registerThumbtack(server: McpServer) {
  server.tool(
    "search_thumbtack",
    "Search local service professionals from Thumbtack. Find plumbers, electricians, cleaners, and 1000+ other service categories. Returns ratings, reviews, pricing, and hire counts.",
    {
      query: z
        .string()
        .describe('Service category (e.g. "plumbers", "house cleaners", "electricians")'),
      location: z
        .string()
        .optional()
        .describe('City/state slug (e.g. "san-francisco/ca", "austin/tx"). Omit for national results.'),
      limit: z
        .number()
        .int()
        .min(1)
        .max(20)
        .default(20)
        .describe("Number of results (max 20)"),
    },
    async ({ query, location, limit }) => {
      const params = new URLSearchParams();
      params.set("query", query);
      params.set("limit", String(limit));
      if (location) params.set("location", location);
      return result(await mcpFetch(`${BACKEND_URL}/thumbtack/search?${params.toString()}`));
    }
  );
}
