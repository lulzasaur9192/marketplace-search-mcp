#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
declare function createServer(): McpServer;
export declare function createSandboxServer(): McpServer;
export default createServer;
