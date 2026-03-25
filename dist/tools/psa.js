import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerPsa(server) {
    server.tool("psa_population_report", "Look up PSA card certification details and full population report. Returns card info (year, brand, subject, grade) and complete grade breakdown from Auth through PSA 10, showing how many cards exist at each grade level.", {
        certNumber: z.string().optional().describe('PSA certification number on the slab (e.g. "10000001")'),
        specID: z.number().int().optional().describe("PSA spec ID for direct population lookup"),
    }, async ({ certNumber, specID }) => {
        const params = new URLSearchParams();
        if (certNumber)
            params.set("certNumber", certNumber);
        if (specID)
            params.set("specID", String(specID));
        return result(await mcpFetch(`${BACKEND_URL}/psa/pop?${params.toString()}`));
    });
}
