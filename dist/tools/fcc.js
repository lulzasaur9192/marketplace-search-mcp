import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerFcc(server) {
    server.tool("search_fcc", "Search FCC ID certifications for electronic devices. Look up by FCC ID, grantee code, or applicant name. Returns certification details including equipment class, grant dates, and test reports.", {
        fccId: z.string().optional().describe('Full FCC ID (e.g. "BCG-E3994A")'),
        granteeCode: z.string().optional().describe('Grantee code prefix (e.g. "BCG" for Apple)'),
        applicantName: z.string().optional().describe('Company name (e.g. "Apple")'),
        limit: z.number().int().min(1).max(100).default(20).describe("Max results (max 100)"),
    }, async ({ fccId, granteeCode, applicantName, limit }) => {
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        if (fccId)
            params.set("fccId", fccId);
        if (granteeCode)
            params.set("granteeCode", granteeCode);
        if (applicantName)
            params.set("applicantName", applicantName);
        return result(await mcpFetch(`${BACKEND_URL}/fcc/search?${params.toString()}`));
    });
    server.tool("fcc_details", "Get full FCC certification details for a specific FCC ID. Returns equipment info, test reports, grant conditions, and compliance documents.", {
        fccId: z.string().describe('FCC ID to look up (e.g. "BCG-E3994A")'),
    }, async ({ fccId }) => {
        return result(await mcpFetch(`${BACKEND_URL}/fcc/details?fccId=${encodeURIComponent(fccId)}`));
    });
}
