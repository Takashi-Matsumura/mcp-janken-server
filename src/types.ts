/**
 * じゃんけんMCPサーバーの型定義
 */

/**
 * じゃんけんの手の型
 */
export type Hand = "グー" | "チョキ" | "パー";

/**
 * じゃんけんの結果の型
 */
export type GameResult = "あいこ" | "プレイヤーの勝ち" | "AIの勝ち";

/**
 * じゃんけんのルール
 */
export const JANKEN_RULES = `じゃんけんのルール：
- グーはチョキに勝つ
- チョキはパーに勝つ
- パーはグーに勝つ`;

/**
 * じゃんけんの全ての手
 */
export const ALL_HANDS: Hand[] = ["グー", "チョキ", "パー"];