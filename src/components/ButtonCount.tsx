import { Data } from "@/types/data";
import { Dispatch, SetStateAction } from "react";

interface ButtonCountProps {
  index: number;
  teams: Data["teams"];
  onChange: Dispatch<SetStateAction<Data>>;
}
export const ButtonCount = ({
  index, teams,
  onChange
}: ButtonCountProps) => {
  const increment = ()=>{
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
  return (
    <button className="bg-primary rounded-lg h-20 text-5xl font-sans" onClick={increment}>
      {teams[index].currentScore}
    </button>
  );
};
