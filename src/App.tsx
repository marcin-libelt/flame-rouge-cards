import GameBoard from "./components/GameBoard";
import SetupScreen from "./components/SetupScreen";
import { useRiderCardsContext } from "./lib/hooks";

function App() {
  const { gameData } = useRiderCardsContext();

  return (
    <>
      {!gameData.isPending && <SetupScreen />}
      {gameData.isPending && <GameBoard />}
    </>
  );
}

export default App;
