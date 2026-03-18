#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BACKEND_URL =
  "https://rapidapi-backend-production.up.railway.app";

function createServer(): McpServer {
  const server = new McpServer({
    name: "marketplace-search",
    version: "1.0.0",
  });

  // --- search_tcgplayer ---
  server.tool(
    "search_tcgplayer",
    "Search trading card prices from TCGPlayer. Covers Magic the Gathering, Pokémon, Yu-Gi-Oh!, Lorcana, and more. Returns market prices, lowest prices, listing counts, and card images.",
    {
      query: z
        .string()
        .describe('Card name or search term (e.g. "charizard", "black lotus")'),
      limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20)
        .describe("Number of results to return (max 50)"),
    },
    async ({ query, limit }) => {
      const url = `${BACKEND_URL}/tcgplayer/search?query=${encodeURIComponent(query)}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${data.error}` }],
        };
      }

      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // --- search_reverb ---
  server.tool(
    "search_reverb",
    "Search used and new music gear listings from Reverb.com. Find guitars, amps, pedals, synths, and more. Returns prices, condition, seller info, and listing URLs.",
    {
      query: z
        .string()
        .describe(
          'Instrument or gear search term (e.g. "gibson les paul", "boss ds-1")'
        ),
      limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20)
        .describe("Number of results to return (max 50)"),
    },
    async ({ query, limit }) => {
      const url = `${BACKEND_URL}/reverb/search?query=${encodeURIComponent(query)}&limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${data.error}` }],
        };
      }

      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // --- search_thumbtack ---
  server.tool(
    "search_thumbtack",
    "Search local service professionals from Thumbtack. Find plumbers, electricians, cleaners, and 1000+ other service categories. Returns ratings, reviews, pricing, and hire counts.",
    {
      query: z
        .string()
        .describe(
          'Service category search term (e.g. "plumbers", "house cleaners")'
        ),
      location: z
        .string()
        .optional()
        .describe(
          'City/state slug (e.g. "san-francisco/ca", "austin/tx"). Omit for national results.'
        ),
      limit: z
        .number()
        .int()
        .min(1)
        .max(20)
        .default(20)
        .describe("Number of results to return (max 20)"),
    },
    async ({ query, location, limit }) => {
      let url = `${BACKEND_URL}/thumbtack/search?query=${encodeURIComponent(query)}&limit=${limit}`;
      if (location) {
        url += `&location=${encodeURIComponent(location)}`;
      }
      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${data.error}` }],
        };
      }

      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  return server;
}

// Export for Smithery sandbox scanning
export function createSandboxServer(): McpServer {
  return createServer();
}

// Default export for Smithery
export default createServer;

// CLI entrypoint
async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
