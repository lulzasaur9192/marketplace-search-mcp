import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";

export function registerChildcare(server: McpServer) {
  server.tool(
    "childcare_cost",
    "Look up childcare costs by ZIP code, county, or state. Uses DOL National Database of Childcare Prices (48K records). Returns weekly/annual prices for center-based and family childcare by age group.",
    {
      zip: z.string().optional().describe('ZIP code (e.g. "90210")'),
      county_fips: z.string().optional().describe('County FIPS code (e.g. "06037" for Los Angeles)'),
      state: z.string().optional().describe('State abbreviation (e.g. "CA")'),
      year: z.number().int().optional().describe("Data year (default: latest available)"),
    },
    async ({ zip, county_fips, state, year }) => {
      const params = new URLSearchParams();
      if (zip) params.set("zip", zip);
      if (county_fips) params.set("county_fips", county_fips);
      if (state) params.set("state", state);
      if (year) params.set("year", String(year));
      return result(await mcpFetch(`${BACKEND_URL}/childcare/cost?${params.toString()}`));
    }
  );

  server.tool(
    "childcare_states",
    "Get childcare cost averages for all US states. Compare center-based and family childcare pricing across the country by age group.",
    {
      year: z.number().int().optional().describe("Data year (default: latest available)"),
    },
    async ({ year }) => {
      const params = new URLSearchParams();
      if (year) params.set("year", String(year));
      return result(await mcpFetch(`${BACKEND_URL}/childcare/states?${params.toString()}`));
    }
  );

  server.tool(
    "childcare_compare",
    "Compare childcare costs side-by-side across multiple ZIP codes or locations. Compare up to 10 locations at once.",
    {
      locations: z.string().describe('Comma-separated ZIP codes (e.g. "90210,10001,60601")'),
      year: z.number().int().optional().describe("Data year (default: latest)"),
    },
    async ({ locations, year }) => {
      const params = new URLSearchParams();
      params.set("locations", locations);
      if (year) params.set("year", String(year));
      return result(await mcpFetch(`${BACKEND_URL}/childcare/compare?${params.toString()}`));
    }
  );
}
