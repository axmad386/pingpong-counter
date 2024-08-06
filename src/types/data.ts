export interface Data {
  teams: {
    name: string;
    currentScore: number;
  }[];
  config: {
    serveCount: number;
    gamePoint: number;
    teamPosition: "left-right"|"right-left";
  },
}
