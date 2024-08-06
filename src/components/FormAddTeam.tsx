import { Dispatch, SetStateAction } from "react";
import { Data } from "../types/data";

interface FormAddTeamProps {
  onSave: Dispatch<SetStateAction<Data|undefined>>;
}
export const FormAddTeam = ({ onSave }: FormAddTeamProps) => {
  const saveTeam = (e: any) => {
    e.preventDefault();
    onSave((prev) => ({
      ...prev,
      teams: [
        {
          name: e.target.team_1.value,
          currentScore: 0,
        },
        {
          name: e.target.team_2.value,
          currentScore: 0,
        },
      ],
    }));
  };
  return (
    <form
      className="shadow bg-white rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={saveTeam}
    >
      <h1 className="text-3xl font-bold">Add Team</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="team_1"
        >
          First Team
        </label>
        <input
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="team_1"
          type="text"
          placeholder="Team A"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="team_2"
        >
          Second Team
        </label>
        <input
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="team_2"
          type="text"
          placeholder="Team B"
        />
      </div>
      <button>Save</button>
    </form>
  );
};
