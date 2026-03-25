#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerMarketplaceSearch } from "./tools/marketplace-search.js";
import { registerImdb } from "./tools/imdb.js";
import { registerHouzz } from "./tools/houzz.js";
import { registerThumbtack } from "./tools/thumbtack.js";
import { registerLicense } from "./tools/license.js";
import { registerPsa } from "./tools/psa.js";
import { registerNycViolations } from "./tools/nyc-violations.js";
import { registerFcc } from "./tools/fcc.js";
import { registerChildcare } from "./tools/childcare.js";
import { registerEstateSales } from "./tools/estate-sales.js";
import { registerStorage } from "./tools/storage.js";
import { registerHomeServices } from "./tools/home-services.js";
import { registerGsaAuctions } from "./tools/gsa-auctions.js";
import { registerSkillguard } from "./tools/skillguard.js";
function createServer() {
    const server = new McpServer({
        name: "marketplace-search",
        version: "2.0.0",
    });
    registerMarketplaceSearch(server); // 1 tool (13 marketplaces)
    registerImdb(server); // 1 tool
    registerHouzz(server); // 1 tool
    registerThumbtack(server); // 1 tool
    registerLicense(server); // 2 tools (contractor + nurse)
    registerPsa(server); // 1 tool
    registerNycViolations(server); // 1 tool
    registerFcc(server); // 2 tools (search + details)
    registerChildcare(server); // 3 tools (cost + states + compare)
    registerEstateSales(server); // 2 tools (search + details)
    registerStorage(server); // 2 tools (search + details)
    registerHomeServices(server); // 1 tool
    registerGsaAuctions(server); // 3 tools (search + details + stats)
    registerSkillguard(server); // 1 tool
    // Total: 22 tools
    return server;
}
// Export for Smithery sandbox scanning
export function createSandboxServer() {
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
