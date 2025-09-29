export const EMOJI_TO_TYPE: Record<string, string> = {
  "👍": "LIKE",
  "❤️": "LOVE",
  "😂": "HAHA",
  "😢": "SAD",
  "😮": "WOW",
  "😡": "ANGRY",
  "👎": "DISLIKE",
};

export const TYPE_TO_EMOJI: Record<string, string> = Object.fromEntries(
  Object.entries(EMOJI_TO_TYPE).map(([emoji, type]) => [type, emoji])
);
