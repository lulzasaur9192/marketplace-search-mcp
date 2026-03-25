import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";

const MARKETPLACES = [
  "tcgplayer", "reverb", "grailed", "redfin", "bonanza",
  "thriftbooks", "abebooks", "goodreads", "offerup", "swappa",
  "stubhub", "craigslist", "poshmark",
] as const;

export function registerMarketplaceSearch(server: McpServer) {
  server.tool(
    "marketplace_search",
    `Search across 13 online marketplaces. Supported marketplaces: ${MARKETPLACES.join(", ")}. Returns listings with prices, conditions, seller info, and URLs. Each marketplace specializes in different categories: tcgplayer (trading cards), reverb (music gear), grailed (designer fashion), redfin (real estate), bonanza (general), thriftbooks/abebooks/goodreads (books), offerup/craigslist (local classifieds), swappa (electronics), stubhub (event tickets), poshmark (fashion resale).`,
    {
      marketplace: z
        .enum(MARKETPLACES)
        .describe("Which marketplace to search"),
      query: z
        .string()
        .describe('Search term (e.g. "charizard", "gibson les paul", "iphone 15")'),
      limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20)
        .describe("Number of results (max 50)"),
      location: z
        .string()
        .optional()
        .describe("Location filter for offerup/craigslist (e.g. \"NYC\", \"SF\")"),
      minPrice: z
        .number()
        .optional()
        .describe("Minimum price filter (grailed, offerup, craigslist, poshmark)"),
      maxPrice: z
        .number()
        .optional()
        .describe("Maximum price filter (grailed, offerup, craigslist, poshmark)"),
      sortBy: z
        .string()
        .optional()
        .describe("Sort order: newest, relevance, price (marketplace-dependent)"),
    },
    async ({ marketplace, query, limit, location, minPrice, maxPrice, sortBy }) => {
      const params = new URLSearchParams();
      params.set("query", query);
      params.set("limit", String(limit));
      if (location) params.set("location", location);
      if (minPrice != null) params.set("minPrice", String(minPrice));
      if (maxPrice != null) params.set("maxPrice", String(maxPrice));
      if (sortBy) params.set("sortBy", sortBy);

      const url = `${BACKEND_URL}/${marketplace}/search?${params.toString()}`;
      return result(await mcpFetch(url));
    }
  );
}
