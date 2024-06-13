import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import PlayerCard from "./Card";
import { useRiderCardsContext } from "../lib/hooks";
import {
  HandleDrawCardsProps,
  HandleSelectCardProps,
  Rider,
} from "../lib/types";

type RiderCardsPanelProps = {
  rider: Rider;
  isAllow: boolean;
  handleDrawCards: HandleDrawCardsProps;
  handleSelectCard: HandleSelectCardProps;
};

export default function RiderCardsPanel({
  rider,
  isAllow,
  handleDrawCards,
  handleSelectCard,
}: RiderCardsPanelProps) {
  const {
    hasCardsInHand,
    hasSeletedCard,
    areCardsReaviled,
    addExhaustionCard,
    getCurrentHand,
  } = useRiderCardsContext();

  const [penaltyLength, setPenaltyLength] = useState(0);

  const id = rider.id;
  const isReaviled = areCardsReaviled();
  const currentHand = getCurrentHand(id);

  const handleAddPenalty = () => {
    setPenaltyLength((prev) => prev + 1);
    addExhaustionCard(id);
  };

  return (
    <Flex gapX="2">
      {!hasCardsInHand(id) && !hasSeletedCard(id) && (
        <Button onClick={() => handleDrawCards(id)} disabled={!isAllow}>
          Draw Cards
        </Button>
      )}
      {currentHand.length > 0 && (
        <Flex gapX="2">
          {currentHand.map((num, index) => (
            <PlayerCard key={index} onClick={() => handleSelectCard(id, num)}>
              {num}
            </PlayerCard>
          ))}
        </Flex>
      )}
      {rider.selected.length > 0 && (
        <PlayerCard isReaviled={isReaviled}>
          {isReaviled ? rider.selected : ":)"}
        </PlayerCard>
      )}

      {areCardsReaviled() && (
        <Flex>
          <PlayerCard variant="penalty" onClick={handleAddPenalty}>
            {"+2"}
          </PlayerCard>
          {Array(penaltyLength)
            .fill(undefined)
            .map((_, index) => (
              <span key={index}>.</span>
            ))}
        </Flex>
      )}
    </Flex>
  );
}
