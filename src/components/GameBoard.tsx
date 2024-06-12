import { Box, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { useRiderCardsContext } from "../lib/hooks";
import { Rider, RiderId } from "../lib/types";
import classes from "./gameboard.module.less";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

type HandleSelectCardProps = (riderId: RiderId, num: number) => void;
type HandleDrawCardsProps = (riderId: RiderId) => void;
type BoardRider = {
  riderId: RiderId;
  allow: boolean;
  completed: boolean;
};

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

  return (
    <div>
      <div>
        {ridersData.map((rider) => {
          const br = boardRiders.find(
            (b) => b.riderId === rider.id
          ) as BoardRider;
          return (
            <RiderPanel
              key={rider.id}
              rider={{ ...rider, ...br }}
              handleDrawCards={handleDrawCards}
              handleSelectCard={handleSelectCard}
            />
          );
        })}
      </div>
      <Separator my="4" size="4" />
      <Box>
        {!areCardsReaviled() && isLastStep() && (
          <Button onClick={revealAllCards}>Reveal cards</Button>
        )}
        {areCardsReaviled() && (
          <Button onClick={startNewRound}>Start new round</Button>
        )}
      </Box>
    </div>
  );
}

function RiderPanel({
  rider,
  handleDrawCards,
  handleSelectCard,
}: {
  rider: Rider & BoardRider;
  handleDrawCards: HandleDrawCardsProps;
  handleSelectCard: HandleSelectCardProps;
}) {
  const { getCurrentHand, hasCardsInHand, hasSeletedCard, areCardsReaviled } =
    useRiderCardsContext();

  const isAllow = rider.allow;
  const id = rider.id;
  const reaviled = areCardsReaviled();

  return (
    <Box>
      <Flex justify="between">
        <Text size="2">{`${rider.name}`}</Text>

        {hasSeletedCard(id) && (
          <CheckCircledIcon height={30} width={30} color="green" />
        )}
        {isAllow && !hasSeletedCard(id) && (
          <QuestionMarkCircledIcon height={30} width={30} />
        )}
        {!isAllow && !hasSeletedCard(id) && (
          <CrossCircledIcon height={30} width={30} color="orange" />
        )}
      </Flex>

      <Flex>
        {!hasCardsInHand(id) && !hasSeletedCard(id) && (
          <Button onClick={() => handleDrawCards(id)} disabled={!isAllow}>
            Draw Cards
          </Button>
        )}
        <Flex gapX="2">
          {getCurrentHand(id).map((num, index) => (
            <Button
              variant="soft"
              key={index}
              onClick={() => handleSelectCard(id, num)}
            >
              {num}
            </Button>
          ))}
        </Flex>
      </Flex>

      {rider.selected.length > 0 && (
        <Button variant="soft" size={reaviled ? "4" : "2"}>
          {reaviled ? rider.selected : ":)"}
        </Button>
      )}
    </Box>
  );
}
