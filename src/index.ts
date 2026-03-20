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

  // --- verify_contractor_license ---
  server.tool(
    "verify_contractor_license",
    "Verify a contractor's license across US states (CA, TX, FL, NY). Search by license number, person name, or business name. Returns license status, expiration, classifications, and contact info from official state licensing boards.",
    {
      state: z
        .enum(["CA", "TX", "FL", "NY"])
        .describe("US state code: CA (California CSLB), TX (Texas TDLR), FL (Florida DBPR), NY (New York City)"),
      licenseNumber: z
        .string()
        .optional()
        .describe('License number to look up (e.g. "1096738" for CA, "CGC1507744" for FL)'),
      lastName: z
        .string()
        .optional()
        .describe("Last name for person name search"),
      firstName: z
        .string()
        .optional()
        .describe("First name for person name search (optional)"),
      businessName: z
        .string()
        .optional()
        .describe("Business or company name to search for"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(25)
        .default(10)
        .describe("Number of results to return (max 25)"),
    },
    async ({ state, licenseNumber, lastName, firstName, businessName, limit }) => {
      const params = new URLSearchParams();
      params.set("state", state);
      params.set("limit", String(limit));
      if (licenseNumber) params.set("licenseNumber", licenseNumber);
      if (lastName) params.set("lastName", lastName);
      if (firstName) params.set("firstName", firstName);
      if (businessName) params.set("businessName", businessName);

      const url = `${BACKEND_URL}/contractor-license/verify?${params.toString()}`;
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

  // --- psa_population_report ---
  server.tool(
    "psa_population_report",
    "Look up PSA card certification details and full population report. Returns card info (year, brand, subject, grade) and complete grade breakdown from Auth through PSA 10, showing how many cards exist at each grade level.",
    {
      certNumber: z
        .string()
        .optional()
        .describe('PSA certification number printed on the slab (e.g. "10000001")'),
      specID: z
        .number()
        .int()
        .optional()
        .describe("PSA spec ID for direct population lookup (advanced, from cert lookup)"),
    },
    async ({ certNumber, specID }) => {
      const params = new URLSearchParams();
      if (certNumber) params.set("certNumber", certNumber);
      if (specID) params.set("specID", String(specID));

      const url = `${BACKEND_URL}/psa/pop?${params.toString()}`;
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

  // --- verify_nurse_license ---
  server.tool(
    "verify_nurse_license",
    "Verify a nurse's license across US states (FL, NY). Search by license number or name. Returns license status, expiration, qualifications, and enforcement actions from official state nursing boards.",
    {
      state: z
        .enum(["FL", "NY"])
        .describe("US state code: FL (Florida DOH MQA), NY (New York NYSED)"),
      licenseNumber: z
        .string()
        .optional()
        .describe('License number to look up (e.g. "RN9414870" for FL, "825282" for NY)'),
      lastName: z
        .string()
        .optional()
        .describe("Last name for person name search"),
      firstName: z
        .string()
        .optional()
        .describe("First name for person name search (optional)"),
      licenseType: z
        .string()
        .optional()
        .describe("License type filter: RN, LPN, NP, APRN, CNA"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(25)
        .default(10)
        .describe("Number of results to return (max 25)"),
    },
    async ({ state, licenseNumber, lastName, firstName, licenseType, limit }) => {
      const params = new URLSearchParams();
      params.set("state", state);
      params.set("limit", String(limit));
      if (licenseNumber) params.set("licenseNumber", licenseNumber);
      if (lastName) params.set("lastName", lastName);
      if (firstName) params.set("firstName", firstName);
      if (licenseType) params.set("licenseType", licenseType);

      const url = `${BACKEND_URL}/nurse-license/verify?${params.toString()}`;
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

  // --- search_nyc_violations ---
  server.tool(
    "search_nyc_violations",
    "Search NYC Department of Buildings violation records by address, BIN, or block+lot. Covers DOB Violations, DOB Safety Violations, and DOB ECB Violations (with penalty amounts). Use summary=true for aggregate stats (open/closed counts, by type, by year, ECB penalty totals).",
    {
      house_number: z
        .string()
        .optional()
        .describe('House number (e.g. "1", "350"). Use with street.'),
      street: z
        .string()
        .optional()
        .describe('Street name (e.g. "BROADWAY", "5TH AVE"). Use with house_number.'),
      bin: z
        .string()
        .optional()
        .describe("NYC BIN (Building Identification Number)"),
      block: z
        .string()
        .optional()
        .describe("Tax block number (use with lot)"),
      lot: z
        .string()
        .optional()
        .describe("Tax lot number (use with block)"),
      borough: z
        .string()
        .optional()
        .describe('Borough: manhattan, bronx, brooklyn, queens, or "staten island"'),
      summary: z
        .boolean()
        .default(false)
        .describe("Set true for aggregate stats instead of individual violations"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(100)
        .default(20)
        .describe("Max results (ignored when summary=true)"),
    },
    async ({ house_number, street, bin, block, lot, borough, summary, limit }) => {
      const params = new URLSearchParams();
      if (house_number) params.set("house_number", house_number);
      if (street) params.set("street", street);
      if (bin) params.set("bin", bin);
      if (block) params.set("block", block);
      if (lot) params.set("lot", lot);
      if (borough) params.set("borough", borough);
      if (!summary) params.set("limit", String(limit));

      const endpoint = summary ? "summary" : "search";
      const url = `${BACKEND_URL}/nyc-violations/${endpoint}?${params.toString()}`;
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
