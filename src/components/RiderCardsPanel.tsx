import { Button, Flex } from "@radix-ui/themes";
import PlayerCard from "./Card";
import { useRiderCardsContext } from "../lib/hooks";
import {
  HandleDrawCardsProps,
  HandleSelectCardProps,
  Rider,
} from "../lib/types";
import { HandIcon, LockClosedIcon } from "@radix-ui/react-icons";
import Tip from "./Tip";

type RiderCardsPanelProps = {
  rider: Rider;
  isAllow: boolean;
  penaltyLength: number;
  setPenaltyLength: (penaltyLength: number) => void;
  handleDrawCards: HandleDrawCardsProps;
  handleSelectCard: HandleSelectCardProps;
};

export default function RiderCardsPanel({
  rider,
  isAllow,
  penaltyLength,
  setPenaltyLength,
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

  const { id } = rider;
  const isReaviled = areCardsReaviled();
  const currentHand = getCurrentHand(id);

  const handleAddPenalty = () => {
    setPenaltyLength(penaltyLength + 1);
    addExhaustionCard(id);
  };

  return (
    <Flex gapX="2">
      {!hasCardsInHand(id) && !hasSeletedCard(id) && (
        <Flex justify="between" align="center" width="100%">
          <Button onClick={() => handleDrawCards(id)} disabled={!isAllow}>
            <HandIcon />
            Draw Cards
          </Button>
          {!isAllow && <Tip>Wait for other rider</Tip>}
        </Flex>
      )}
      {currentHand.length > 0 && (
        <Flex justify="between" align="center" width="100%">
          <Flex gapX="2">
            {currentHand.map((num, index) => (
              <PlayerCard key={index} onClick={() => handleSelectCard(id, num)}>
                {num}
              </PlayerCard>
            ))}
          </Flex>
          <Tip>Choose 1 card</Tip>
        </Flex>
      )}

      {rider.selected.length > 0 && (
        <PlayerCard
          isReaviled={isReaviled}
          color={!isReaviled ? "green" : undefined}
        >
          {isReaviled ? rider.selected : <LockClosedIcon />}
        </PlayerCard>
      )}

      {areCardsReaviled() && (
        <Flex>
          <PlayerCard color="red" onClick={handleAddPenalty}>
            {"+2"}
          </PlayerCard>
        </Flex>
      )}
    </Flex>
  );
}
