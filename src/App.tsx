import { Button } from "@radix-ui/themes";
import GameBoard from "./components/GameBoard";
import SetupScreen from "./components/SetupScreen";
import { RIDERS_LIMIT } from "./config";
import { useRiderCardsContext } from "./lib/hooks";

function App() {
  const { ridersData, setGameData, gameData } = useRiderCardsContext();

  const startGame = () => {
    setGameData({ ...gameData, isPending: true });
  };

  return (
    <>
      {!gameData.isPending && <SetupScreen />}

      {ridersData.length >= RIDERS_LIMIT && !gameData.isPending && (
        <Button variant="classic" onClick={startGame}>
          Edit profile
        </Button>
      )}

      {gameData.isPending && <GameBoard />}
    </>
  );
}

export default App;
