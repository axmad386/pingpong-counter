import { cn } from "@/lib/utils";
import { Data } from "@/types/data";
import { Dispatch, SetStateAction } from "react";

interface ButtonCountProps {
  index: number;
  data: Data;
  onChange: Dispatch<SetStateAction<Data>>;
}
export const ButtonCount = ({
  index,
  data: { teams, config },
  onChange,
}: ButtonCountProps) => {
  const otherTeam = teams.find((_, i) => i !== index)!;
  const isDeuce = (teams[index].currentScore+otherTeam.currentScore) >= (config.gamePoint-1)*2 && otherTeam.currentScore == teams[index].currentScore
  const isGame = teams[index].currentScore >= config.gamePoint? teams[index].currentScore-otherTeam.currentScore >=2 : teams[index].currentScore >= config.gamePoint
  const increment = () => {
    if (!isGame) {
      onChange((prev) => ({
        ...prev,
        teams: [
          ...teams.slice(0, index),
          {
            ...teams[index],
            currentScore: teams[index].currentScore + 1,
          },
          ...teams.slice(index + 1),
        ],
      }));
    }
  };

  const undo = () => {
    onChange((prev) => ({
      ...prev,
      teams: [
        ...teams.slice(0, index),
        {
          ...teams[index],
          currentScore: teams[index].currentScore - 1,
        },
        ...teams.slice(index + 1),
      ],
    }));
  };

  return (
    <div className={cn("h-30 flex relative flex-col items-center flex-grow gap-2", isGame?"border-yellow-600 border-2 rounded":"")}>
      {isGame && <div className="absolute -top-6 bg-yellow-400 rounded-t px-3 text-white">Win</div>}
      {isDeuce && <div className="absolute -top-6 bg-blue-400 rounded-t px-3 text-white">Deuce</div>}
      <button
        className="bg-primary-foreground rounded-lg h-20 w-full text-5xl font-sans"
        onClick={increment}
      >
        {teams[index].currentScore}
      </button>
      {teams[index].currentScore > 0 && (
        <button className="iconify bx--undo text-xl" onClick={undo}></button>
      )}
    </div>
  );
};
