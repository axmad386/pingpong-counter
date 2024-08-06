import { useEffect, useState } from "react";
import { Data } from "./types/data";
import { FormAddTeam } from "./components/FormAddTeam";

const initialData: Data = {
  teams: [],
};

function App() {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setData(JSON.parse(data) || initialData);
    }
  }, []);

  const resetData = () => {
    setData(initialData);
  };

  const { teams = [] } = data! || {};
  return (
    <div className="bg-gray-800 min-h-svh w-full text-gray-100">
      {teams.length < 2 && <FormAddTeam onSave={setData} />}
      {teams.length == 2 && (
        <div className="flex flex-row justify-evenly w-full">
            <div>{teams[0].name}</div>
            <div>VS</div>
            <div>{teams[1].name}</div>
        </div>
      )}
      <button onClick={resetData} className="fixed bottom-6 right-6 rounded-full" title='reset'>
        <i className="iconify bx--reset h-10 w-10"></i>
      </button>
    </div>
  );
}

export default App;
