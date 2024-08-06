import { useEffect, useState } from "react";
import { Data } from "./types/data";
import { FormAddTeam } from "./components/FormAddTeam";
import { ButtonCount } from "./components/ButtonCount";
import { Button } from "./components/ui/button";

const initialData: Data = {
  teams: [],
  config: {
    serveCount: 5,
    gamePoint: 21,
    teamPosition: "left-right"
  },
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
    window.confirm("Are you sure, all data will be reset?") &&
    setData(initialData);
  };
  const switchPosition = ()=>{
    setData(prev=>{
      return {
        ...prev,
        config: {
          ...prev.config,
          teamPosition: prev.config.teamPosition == "left-right" ? "right-left" : "left-right"
        }
      }
    })
  }
  const resetScore=()=>{
    window.confirm("Are you sure, score will be reset?") &&
    setData(prev=>{
      return {
        ...prev,
        teams: prev.teams.map((team)=>{
          return {
            ...team,
            currentScore: 0
          }
        })
      }
    })
  }
  const { teams = [], config: {
    teamPosition
  } } = data! || {};
  return (
    <div className="bg-gray-700 min-h-svh w-full text-gray-100 flex flex-col items-center justify-center dark">
      {teams.length < 2 && <FormAddTeam onSave={setData} />}
      {teams.length == 2 && (
        <div className="grid grid-cols-3 w-full container mx-auto p-6 text-center gap-y-6 ">
          <div className="text-3xl">{teams[teamPosition == "left-right" ? 0 : 1].name}</div>
          <div className="text-2xl">VS</div>
          <div className="text-3xl">{teams[teamPosition == "left-right" ? 1 : 0].name}</div>

          <ButtonCount index={teamPosition == "left-right" ? 0 : 1} data={data} onChange={setData}/>
          <div><Button className="mt-6" onClick={resetScore}>Reset Score</Button></div>
          <ButtonCount index={teamPosition == "left-right" ? 1 : 0} data={data} onChange={setData} />

          <div></div>
          <Button variant="outline" onClick={switchPosition}>Switch Position</Button>
        </div>
      )}
      <button
        onClick={resetData}
        className="fixed bottom-6 right-6 rounded-full"
        title="reset"
      >
        <i className="iconify bx--reset h-10 w-10"></i>
      </button>
      <a href="https://github.com/axmad386/pingpong-counter" className="fixed bottom-6 left-6 rounded-full" target="_blank">
        <i className="iconify bx--bxl-github h-10 w-10"></i>
      </a>
    </div>
  );
}

export default App;
