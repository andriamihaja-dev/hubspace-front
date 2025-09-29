interface ReactionStatsProps {
  reactions: Record<string, number>;
}

export function ReactionStats({ reactions }: ReactionStatsProps) {
  const entries = Object.entries(reactions).filter(([, count]) => count > 0);

  if (entries.length === 0) return null;

  return (
    <div className="flex items-center space-x-1 text-sm">
      {entries.map(([emoji, count]) => (
        <div key={emoji} className="flex items-center space-x-0.5">
          <span>{emoji}</span>
          <span>{count}</span>
        </div>
      ))}
    </div>
  );
}
