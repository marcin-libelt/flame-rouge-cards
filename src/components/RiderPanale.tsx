import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  BoardRider,
  HandleDrawCardsProps,
  HandleSelectCardProps,
  Rider,
} from "../lib/types";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useRiderCardsContext } from "../lib/hooks";
import PlayerCard from "./Card";
import { useState } from "react";
type RiderPanelProps = {
  rider: Rider & BoardRider;
  handleDrawCards: HandleDrawCardsProps;
  handleSelectCard: HandleSelectCardProps;
};

export default function RiderPanel({
  rider,
  handleDrawCards,
  handleSelectCard,
}: RiderPanelProps) {
  const [penaltyLength, setPenaltyLength] = useState(0);

  const {
    getCurrentHand,
    hasCardsInHand,
    hasSeletedCard,
    areCardsReaviled,
    addExhaustionCard,
  } = useRiderCardsContext();

  const isAllow = rider.allow;
  const id = rider.id;
  const isReaviled = areCardsReaviled();
  const currentHand = getCurrentHand(id);
  const sizes = { height: 25, width: 25 };

  const handleAddPenalty = () => {
    setPenaltyLength((prev) => prev + 1);
    addExhaustionCard(id);
  };

  return (
    <Box>
      <Flex justify="between">
        <Text size="2">{`${rider.name}`}</Text>

        {hasSeletedCard(id) && <CheckCircledIcon {...sizes} color="green" />}
        {isAllow && !hasSeletedCard(id) && (
          <QuestionMarkCircledIcon {...sizes} />
        )}
        {!isAllow && !hasSeletedCard(id) && (
          <CrossCircledIcon {...sizes} color="orange" />
        )}
      </Flex>

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
              .map((c, index) => (
                <span key={index}>.</span>
              ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
