import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";

export function registerHomeServices(server: McpServer) {
  server.tool(
    "home_service_cost",
    "Get cost estimates for home services (plumbing, electrical, cleaning, etc.). Returns min/max/average/median pricing and top-rated professionals in the area. Powered by Thumbtack data.",
    {
      service: z.string().describe('Service type (e.g. "plumber", "electrician", "house cleaning")'),
      zip: z.string().optional().describe('ZIP code for local pricing (e.g. "90210")'),
      location: z.string().optional().describe('City/area name (e.g. "NYC", "Los Angeles")'),
    },
    async ({ service, zip, location }) => {
      const params = new URLSearchParams();
      params.set("service", service);
      if (zip) params.set("zip", zip);
      if (location) params.set("location", location);
      return result(await mcpFetch(`${BACKEND_URL}/home-services/cost?${params.toString()}`));
    }
  );
}
