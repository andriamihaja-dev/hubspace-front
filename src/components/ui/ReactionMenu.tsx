const EMOJIS = ["👍", "❤️", "😂", "😢", "😮", "😡", "👎"]

export function ReactionMenu({
  onSelect,
}: {
  onSelect: (emoji: string) => void
}) {
  return (
    <div className="flex space-x-2">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          title={`Réagir avec ${emoji}`}
          aria-label={`Réagir avec ${emoji}`}
          className="text-2xl hover:scale-125 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
