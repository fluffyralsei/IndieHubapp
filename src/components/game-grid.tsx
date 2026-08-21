import type { Game } from "@/types/game";
import { GameCard } from "./game-card";
export function GameGrid({ games }: { games: Game[] }) { return <div className="game-grid">{games.map((game, index) => <GameCard key={game.id} game={game} index={index} />)}</div>; }
