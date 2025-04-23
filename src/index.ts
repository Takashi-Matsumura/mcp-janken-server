#!/usr/bin/env node
/**
 * じゃんけんMCPサーバー
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { 
  registerResourcesHandler,
  registerResourceReadHandler,
  registerPromptsHandler,
  registerToolsHandler,
  registerToolCallHandler
} from "./handlers.js";

/**
 * サーバーを設定して起動する
 */
async function runServer() {
  console.error("じゃんけんMCPサーバーを起動します...");
  
  // サーバーインスタンスの作成
  const server = new Server(
    {
      name: "janken-mcp-server",
      version: "0.1.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
        prompts: {}
      },
    },
  );
  
  // 各種ハンドラを登録
  registerResourcesHandler(server);
  registerResourceReadHandler(server);
  registerPromptsHandler(server);
  registerToolsHandler(server);
  registerToolCallHandler(server);
  
  // サーバー接続
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("じゃんけんMCPサーバーが起動しました");
}

// エラーハンドリング付きでサーバーを起動
runServer().catch((error) => {
  console.error("サーバー起動エラー:", error);
  process.exit(1);
});