import { Container } from "@radix-ui/themes";
import GameBoard from "./components/GameBoard";
import SetupScreen from "./components/SetupScreen";
import { useRiderCardsContext } from "./lib/hooks";

function App() {
  const { gameData } = useRiderCardsContext();

  return (
    <Container size="1">
      {!gameData.isPending && <SetupScreen />}
      {gameData.isPending && <GameBoard />}
    </Container>
  );
}

export default App;
