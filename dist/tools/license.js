import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";
export function registerLicense(server) {
    // --- verify_contractor_license ---
    server.tool("verify_contractor_license", "Verify a contractor's license across US states (CA, TX, FL, NY). Search by license number, person name, or business name. Returns license status, expiration, classifications, and contact info from official state licensing boards.", {
        state: z
            .enum(["CA", "TX", "FL", "NY"])
            .describe("US state: CA (CSLB), TX (TDLR), FL (DBPR), NY (NYC)"),
        licenseNumber: z.string().optional().describe("License number to look up"),
        lastName: z.string().optional().describe("Last name for person search"),
        firstName: z.string().optional().describe("First name (optional with lastName)"),
        businessName: z.string().optional().describe("Business name to search"),
        limit: z.number().int().min(1).max(25).default(10).describe("Max results (max 25)"),
    }, async ({ state, licenseNumber, lastName, firstName, businessName, limit }) => {
        const params = new URLSearchParams();
        params.set("state", state);
        params.set("limit", String(limit));
        if (licenseNumber)
            params.set("licenseNumber", licenseNumber);
        if (lastName)
            params.set("lastName", lastName);
        if (firstName)
            params.set("firstName", firstName);
        if (businessName)
            params.set("businessName", businessName);
        return result(await mcpFetch(`${BACKEND_URL}/contractor-license/verify?${params.toString()}`));
    });
    // --- verify_nurse_license ---
    server.tool("verify_nurse_license", "Verify a nurse's license across US states (FL, NY). Search by license number or name. Returns license status, expiration, qualifications, and enforcement actions from official nursing boards.", {
        state: z.enum(["FL", "NY"]).describe("US state: FL (DOH MQA), NY (NYSED)"),
        licenseNumber: z.string().optional().describe("License number to look up"),
        lastName: z.string().optional().describe("Last name for person search"),
        firstName: z.string().optional().describe("First name (optional)"),
        licenseType: z.string().optional().describe("License type: RN, LPN, NP, APRN, CNA"),
        limit: z.number().int().min(1).max(25).default(10).describe("Max results (max 25)"),
    }, async ({ state, licenseNumber, lastName, firstName, licenseType, limit }) => {
        const params = new URLSearchParams();
        params.set("state", state);
        params.set("limit", String(limit));
        if (licenseNumber)
            params.set("licenseNumber", licenseNumber);
        if (lastName)
            params.set("lastName", lastName);
        if (firstName)
            params.set("firstName", firstName);
        if (licenseType)
            params.set("licenseType", licenseType);
        return result(await mcpFetch(`${BACKEND_URL}/nurse-license/verify?${params.toString()}`));
    });
}
