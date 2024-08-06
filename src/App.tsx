import { useEffect, useState } from "react";
import { Data } from "./types/data";
import { FormAddTeam } from "./components/FormAddTeam";
import { ButtonCount } from "./components/ButtonCount";

const initialData: Data = {
  teams: [],
  config: {
    serveCount: 5,
    gamePoint: 21,
    teamPosition: "left-right"
  }
};

function App() {
  const [data, setData] = useState<Data>(initialData);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if(!isReady) return;
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setData(JSON.parse(data) || initialData);
    }
    setIsReady(true);
  }, []);


  const resetData = () => {
    setData(initialData);
  };

  const { teams = [] } = data! || {};
  return (
    <div className="bg-gray-800 min-h-svh w-full text-gray-100 flex flex-col items-center justify-center">
      {teams.length < 2 && <FormAddTeam onSave={setData} />}
      {teams.length == 2 && (
        <div className="grid grid-cols-3 w-full container mx-auto p-6 text-center gap-y-6 ">
          <div>{teams[0].name}</div>
          <div>VS</div>
          <div>{teams[1].name}</div>

          <ButtonCount index={0} teams={teams} onChange={setData}/>
          <div></div>
          <ButtonCount index={1} teams={teams} onChange={setData} />
        </div>
      )}
      <button
        onClick={resetData}
        className="fixed bottom-6 right-6 rounded-full"
        title="reset"
      >
        <i className="iconify bx--reset h-10 w-10"></i>
      </button>
    </div>
  );
}

export default App;
