/**
 * じゃんけんゲームロジック
 */
import { ALL_HANDS, GameResult, Hand } from "./types.js";

/**
 * ランダムな手を生成する
 * @returns ランダムな手
 */
export function getRandomHand(): Hand {
  return ALL_HANDS[Math.floor(Math.random() * ALL_HANDS.length)];
}

/**
 * じゃんけんの結果を判定する
 * @param playerHand プレイヤーの手
 * @param aiHand AIの手
 * @returns ゲーム結果
 */
export function determineResult(playerHand: Hand, aiHand: Hand): GameResult {
  if (playerHand === aiHand) {
    return "あいこ";
  }
  
  if (
    (playerHand === "グー" && aiHand === "チョキ") ||
    (playerHand === "チョキ" && aiHand === "パー") ||
    (playerHand === "パー" && aiHand === "グー")
  ) {
    return "プレイヤーの勝ち";
  }
  
  return "AIの勝ち";
}

/**
 * 結果メッセージを生成する
 * @param result ゲーム結果
 * @returns 結果メッセージ
 */
export function getResultMessage(result: GameResult): string {
  switch (result) {
    case "あいこ":
      return "あいこです！";
    case "プレイヤーの勝ち":
      return "あなたの勝ちです！";
    case "AIの勝ち":
      return "AIの勝ちです！";
  }
}