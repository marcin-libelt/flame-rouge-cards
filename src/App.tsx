import { Button, Flex } from "@radix-ui/themes";
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
        <Flex justify="center" mt="2">
          <Button variant="classic" color="tomato" size="3" onClick={startGame}>
            I'm READY!
          </Button>
        </Flex>
      )}

      {gameData.isPending && <GameBoard />}
    </>
  );
}

export default App;
