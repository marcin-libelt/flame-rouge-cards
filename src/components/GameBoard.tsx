import { Box, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { useRiderCardsContext } from "../lib/hooks";
import {
  BoardRider,
  HandleDrawCardsProps,
  HandleSelectCardProps,
} from "../lib/types";
//import classes from "./Gameboard.module.less";

import { useState } from "react";
import RiderPanel from "./RiderPanel";
import { EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function GameBoard() {
  const {
    ridersData,
    selectCard,
    drawCards,
    startNewRound,
    isLastStep,
    areCardsReaviled,
    revealAllCards,
  } = useRiderCardsContext();

  const initialState: BoardRider[] = ridersData.map((rider) => ({
    riderId: rider.id,
    allow: true,
    completed: false,
  }));

  const [boardRiders, setBoardRiders] = useState<BoardRider[]>(initialState);
  const [currentRound, setCurrentRound] = useState(1);

  const handleSelectCard: HandleSelectCardProps = (riderId, num) => {
    // allow for all other
    const allowAll = boardRiders.map((r) => {
      return { ...r, allow: true };
    });
    setBoardRiders(allowAll);
    selectCard(riderId, num);
  };

  const handleDrawCards: HandleDrawCardsProps = (riderId) => {
    // disable other panels
    const notAllowed = boardRiders.map((r) => {
      if (r.riderId !== riderId) {
        return { ...r, allow: false };
      } else {
        return r;
      }
    });
    setBoardRiders(notAllowed);
    drawCards(riderId);
  };

  const handleStartNewRound = () => {
    setCurrentRound(currentRound + 1);
    startNewRound();
  };

  return (
    <div>
      <Flex gap="2" direction="column">
        {ridersData.map((rider) => {
          const br = boardRiders.find(
            (b) => b.riderId === rider.id
          ) as BoardRider;
          return (
            <RiderPanel
              key={`${currentRound}-${rider.id}`}
              rider={{ ...rider, ...br }}
              handleDrawCards={handleDrawCards}
              handleSelectCard={handleSelectCard}
            />
          );
        })}
      </Flex>
      <Separator my="4" size="4" />
      <Flex justify={"between"} align={"center"}>
        <Box>
          {!areCardsReaviled() && isLastStep() && (
            <Button onClick={revealAllCards} color="green">
              <EyeOpenIcon />
              Reveal cards
            </Button>
          )}
          {areCardsReaviled() && (
            <Button onClick={handleStartNewRound}>
              <ReloadIcon />
              Start new round
            </Button>
          )}
        </Box>
        <Text size="1">{`Current round: ${currentRound}`}</Text>
      </Flex>
      <Box mt="8">
        <Button
          variant="ghost"
          onClick={() => {
            confirm("Are you sure?") && window.location.reload();
          }}
        >
          Restart game
        </Button>
      </Box>
    </div>
  );
}
