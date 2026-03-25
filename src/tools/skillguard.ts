import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BACKEND_URL, mcpFetch, result } from "../lib/fetch.js";

export function registerSkillguard(server: McpServer) {
  server.tool(
    "skillguard_verify",
    "Verify the safety of an AI agent skill/tool before execution. Classifies as SAFE, CAUTION, or DANGER based on permissions, commands, and description analysis. Use this to audit MCP tools, OpenAI functions, or any agent capability.",
    {
      name: z.string().describe("Skill/tool name to verify"),
      description: z.string().describe("What the skill does"),
      permissions: z
        .array(z.string())
        .optional()
        .describe('Permissions required (e.g. ["filesystem:read", "network:write"])'),
      commands: z
        .array(z.string())
        .optional()
        .describe('Shell commands the skill may execute (e.g. ["rm -rf", "curl"])'),
    },
    async ({ name, description, permissions, commands }) => {
      const body: any = { name, description };
      if (permissions) body.permissions = permissions;
      if (commands) body.commands = commands;
      return result(
        await mcpFetch(`${BACKEND_URL}/skillguard/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    }
  );
}
