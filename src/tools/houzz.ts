import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";

export function registerHouzz(server: McpServer) {
  server.tool(
    "search_houzz",
    "Search Houzz for home design professionals, contractors, and interior designers. Takes a Houzz search URL (browse houzz.com/professionals to build one). Returns pro profiles with ratings, reviews, projects, and contact info.",
    {
      url: z
        .string()
        .describe('Houzz search URL (e.g. "https://www.houzz.com/professionals/general-contractor/san-francisco-ca")'),
      limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20)
        .describe("Number of results (max 50)"),
    },
    async ({ url, limit }) => {
      const params = new URLSearchParams();
      params.set("url", url);
      params.set("limit", String(limit));
      return result(await mcpFetch(`${BACKEND_URL}/houzz/search?${params.toString()}`));
    }
  );
}
