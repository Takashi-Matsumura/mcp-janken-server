/**
 * MCPサーバーリクエストハンドラ
 */
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { 
  determineResult, 
  getRandomHand, 
  getResultMessage 
} from "./game.js";
import { ALL_HANDS, Hand, JANKEN_RULES } from "./types.js";

/**
 * リソース一覧ハンドラの登録
 * @param server MCPサーバー
 */
export function registerResourcesHandler(server: any) {
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "janken://rules",
          mimeType: "text/plain",
          name: "じゃんけんのルール",
        },
      ],
    };
  });
}

/**
 * リソース読み込みハンドラの登録
 * @param server MCPサーバー
 */
export function registerResourceReadHandler(server: any) {
  server.setRequestHandler(ReadResourceRequestSchema, async (request: any) => {
    const resourceUrl = new URL(request.params.uri);
    
    if (resourceUrl.pathname === "/rules") {
      return {
        contents: [
          {
            uri: request.params.uri,
            mimeType: "text/plain",
            text: JANKEN_RULES,
          },
        ],
      };
    }
    
    throw new Error(`Unknown resource: ${request.params.uri}`);
  });
}

/**
 * プロンプト一覧ハンドラの登録
 * @param server MCPサーバー
 */
export function registerPromptsHandler(server: any) {
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: []
    };
  });
}

/**
 * ツール一覧ハンドラの登録
 * @param server MCPサーバー
 */
export function registerToolsHandler(server: any) {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "play",
          description: "じゃんけんをプレイする",
          inputSchema: {
            type: "object",
            properties: {
              hand: { 
                type: "string",
                enum: ALL_HANDS
              },
            },
            required: ["hand"]
          },
        },
        {
          name: "random",
          description: "AIがランダムに手を出す",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
      ],
    };
  });
}

/**
 * ツール呼び出しハンドラの登録
 * @param server MCPサーバー
 */
export function registerToolCallHandler(server: any) {
  server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
    if (request.params.name === "play") {
      const playerHand = request.params.arguments?.hand as Hand;
      const aiHand = getRandomHand();
      
      const result = determineResult(playerHand, aiHand);
      const resultMessage = getResultMessage(result);
      
      return {
        content: [{ 
          type: "text", 
          text: `あなた：${playerHand}\nAI：${aiHand}\n${resultMessage}` 
        }],
        isError: false,
      };
    } 
    else if (request.params.name === "random") {
      const aiHand = getRandomHand();
      
      return {
        content: [{ 
          type: "text", 
          text: `AIは${aiHand}を出しました！` 
        }],
        isError: false,
      };
    }
    
    throw new Error(`Unknown tool: ${request.params.name}`);
  });
}